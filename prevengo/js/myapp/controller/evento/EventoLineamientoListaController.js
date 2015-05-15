var nuevo = false;
var nuevorespo = false;
Ext.define('myapp.controller.evento.EventoLineamientoListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventosLineamientos',
             'evento.ListaLineamientosPorEvento'
        
    ],
    requires: [
        'myapp.util.Util',
        
    ],
    refs: [
        {
            ref: 'ListaEventosLineamientos',
            selector: 'listaEventosLineamientos'
        },
        {
            ref: 'WinLineamientoPorEvento',
            selector: 'winLineamientoPorEvento'
        },
        {
            ref: 'ListaLineamientoPorEvento',
            selector: 'listaLineamientoPorEvento'
        },
       {
            ref: 'WinDescripcion',
            selector: 'winDescripcion'
        },
     
        
    ],
    init: function (application) {
        this.control({
            "listaEventosLineamientos":{
                itemdblclick: this.onClickVerLineamiento
            },
           
             "listaLineamientoPorEvento button[name=btnNuevoLineamiento]": {
                click: this.onClickNuevoLineamiento
            },
             "listaLineamientoPorEvento button[name=btnEditarLineamiento]": {
                click: this.onClickEditarLineamiento
            },
             "listaLineamientoPorEvento button[name=btnEliminarLineamiento]": {
                click: this.onClickEliminarLineamiento
            },
             "winDescripcion button[name=btnGuardar]": {
                click: this.onClickGuardarLineamiento
            },
             "winDescripcion button[name=btnLimpiar]": {
                click: this.onClickLimpiarLineamiento
            },
 
        });
    },
   
   
      //==============Funciones de la ListaEventosLineamientos  =====================================
    onClickVerLineamiento: function (record, item, index, e, eOpts ) {

        grid = this.getListaEventosLineamientos();
        record = grid.getSelectionModel().getSelection();
    

       if (record[0].get('estatus')== '<font color=#2E9AFE> Pendiente </font>'
               || record[0].get('estatus')== '<font color=#FF8000> En Ejecución  </font>'
               || record[0].get('estatus')== '<font color=#FF0000> Sin Plan </font>') 
       {
            win= Ext.create('myapp.view.evento.WinLineamientoPorEvento');
            newGrid=this.getListaLineamientoPorEvento();
            store= newGrid.getStore();      
            store.proxy.extraParams.id=item.data.idEv;
            store.load();
            win.setTitle("Lineamientos del evento: "+record[0].get('titulo'));
            win.show();  
       }else 
       {
        win= Ext.create('myapp.view.evento.WinLineamientoPorEvento');
            newGrid=this.getListaLineamientoPorEvento();
            store= newGrid.getStore();      
            store.proxy.extraParams.id=item.data.idEv;
            store.load();
             newGrid.down('button[name=btnNuevoLineamiento]').setVisible(false);
              newGrid.down('button[name=btnEditarLineamiento]').setVisible(false);
               newGrid.down('button[name=btnEliminarLineamiento]').setVisible(false);
            win.setTitle("Lineamientos del evento: "+record[0].get('titulo'));
            win.show();
       }
         
           
        

    }, // fin de la function
   
   
     // ====================funciones de la ventana listaLineamientoPorEvento================
    onClickNuevoLineamiento: function (button, e, options) {
           nuevo = true;  
           win= Ext.create('myapp.view.descripcion.WinDescripcion');
            win.setTitle("Nuevo Lineamiento");
            win.show();
           
    },
    onClickEditarLineamiento: function (button, e, options) {
        nuevo = false;
        var grid = this.getListaLineamientoPorEvento();
        record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            
                var win = Ext.create('myapp.view.descripcion.WinDescripcion');
                win.down('textfield[name=txtDescripcion]').setValue(record[0].get('descripcion'));
                win.setTitle("Actualizar Lineamiento");
                win.show();
        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el evento que desea Editar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
   
       
    },
    onClickEliminarLineamiento: function (button, e, options) {
        var grid = this.getListaLineamientoPorEvento();
        record = grid.getSelectionModel().getSelection();
        
        if (record[0]) {
              Ext.Msg.show({
                title: 'Confirmar',
                msg: 'Esta seguro que desea Eliminar el Lineamiento?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId) {
                    if (buttonId == 'yes') {
                         Ext.Ajax.request({
                        url: BASE_URL+'lineamiento/lineamiento/eliminarLineamiento',
                    method: 'POST',
                    params: {
                        lin:record[0].get('idLin')
                        
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                              Ext.MessageBox.show({ title: 'Mensaje', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                                grid.getView().refresh();
                                grid.getStore().load();
                               
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(result, request){
                    var result = Ext.JSON.decode(result.responseText);   
                     loadingMask.hide();
                           Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                     }
                });                
                    }
                }
            });
    
        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el lineamiento que desea eliminar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
       
    },
   
   
   // ====================funciones de la ventana WinDescripcion================
   
       onClickGuardarLineamiento: function (button, e, options) {
           
          grid = this.getListaEventosLineamientos();
          grid2 = this.getListaLineamientoPorEvento();
          winO = this.getWinDescripcion();
        if (nuevo){     
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid.getSelectionModel().getSelection();
           
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'lineamiento/lineamiento/registrarLineamiento',
            method: 'POST',
            params: {
                descripcion: winO.down("textfield[name=txtDescripcion]").getValue(),
                idEvento: record[0].get('idEv')
            },
            success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
                    loadingMask.hide();

                    if (result.success) {
                    grid2.getView().refresh();
                    grid2.getStore().load();
                    winO.close();
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                   
                }
                else {
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    // myapp.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function (form, action) {
                var result = action.result;
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });
    }
    else { 
          var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid2.getSelectionModel().getSelection();
           
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'lineamiento/lineamiento/actualizarLineamiento',
            method: 'POST',
            params: {
                descripcion: winO.down("textfield[name=txtDescripcion]").getValue(),
                idLineam: record[0].get('idLin')
            },
            success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
                    loadingMask.hide();

                    if (result.success) {
                    grid2.getView().refresh();
                    grid2.getStore().load();
                    winO.close();
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                   
                }
                else {
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    // myapp.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function (form, action) {
                var result = action.result;
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });

    }
       
    },
    onClickLimpiarLineamiento: function (button, e, options) {
         
        
    },
});