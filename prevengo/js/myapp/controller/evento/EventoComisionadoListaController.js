var nuevo = false;
var nuevorespo = false;
Ext.define('myapp.controller.evento.EventoComisionadoListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventosComisionados',
             'evento.ListaComisionadoEvento',
  
    ],
    requires: [
        'myapp.util.Util',
        
    ],
    refs: [
        {
            ref: 'ListaEventosComisionados',
            selector: 'listaEventosComisionados'
        },
        {
            ref: 'WinComisionadoEvento',
            selector: 'winComisionadoEvento'
        },

        {
            ref: 'ListaComisionadoEvento',
            selector: 'listaComisionadoEvento'
        },

        {
            ref: 'ListaAsignarUsuario',
            selector: 'listaAsignarUsuario'
        },
        
       {
            ref: 'WinAsignarUsuario',
            selector: 'winAsignarUsuario'
        }
        
    ],
    init: function (application) {
        this.control({
            "listaEventosComisionados":{
                itemdblclick: this.onClickVerComisionado
            },   
             "listaComisionadoEvento button[name=btnNuevoComisionado]": {
                click: this.onClickNuevoComisionado
            },
             "listaComisionadoEvento button[name=btnEliminarComisionado]": {
                click: this.onClickEliminarComisionado
            },
             "listaAsignarUsuario button[name=btnGuardar]": {
                click: this.onClickGuardarComisionado
            }
 
        });
    },
   
   
      //==============Funciones de la listaEventosComisionados  =====================================
    onClickVerComisionado: function (record, item, index, e, eOpts ) {

        grid = this.getListaEventosComisionados();
        record = grid.getSelectionModel().getSelection();
    

       if (record[0].get('estatus')== '<font color=#2E9AFE> Pendiente </font>'|| record[0].get('estatus')== '<font color=#FF8000> En Ejecución  </font>') 
       {
            win= Ext.create('myapp.view.evento.WinComisionadoEvento');
            newGrid=this.getListaComisionadoEvento();
            store= newGrid.getStore();      
            store.proxy.extraParams.id=item.data.idEv;
            store.load();
            win.setTitle("Comisionados del evento: "+record[0].get('titulo'));
            win.show();  
       }else 
       {
        win= Ext.create('myapp.view.evento.WinComisionadoEvento');
            newGrid=this.getListaComisionadoEvento();
            store= newGrid.getStore();      
            store.proxy.extraParams.id=item.data.idEv;
            store.load();
             newGrid.down('button[name=btnNuevoComisionado]').setVisible(false);
               newGrid.down('button[name=btnEliminarComisionado]').setVisible(false);
            win.setTitle("Comisionados del evento: "+record[0].get('titulo'));
            win.show();
       }
         
    }, // fin de la function
   
   
     // ====================funciones de la ventana listaComisionadoEvento================
    onClickNuevoComisionado: function (button, e, options) {
       
            win= Ext.create('myapp.view.evento.WinAsignarUsuario');
            win.setTitle("Nuevo Comisionado");
            win.show();         
    },
  
    onClickEliminarComisionado: function (button, e, options) {
        var grid = this.getListaComisionadoEvento();
        record = grid.getSelectionModel().getSelection();
        
        if (record[0]) {
              Ext.Msg.show({
                title: 'Confirmar',
                msg: 'Esta seguro que desea Eliminar el Comisionado?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId) {
                    if (buttonId == 'yes') {
                         Ext.Ajax.request({
                        url: BASE_URL+'comisionado/comisionado/eliminarComisionado',
                    method: 'POST',
                    params: {
                        idComi:record[0].get('idCom'),
                       
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
                msg: 'Debe seleccionar el comisionado que desea eliminar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
       
    },
   
   
   // ====================funciones de la ventana listaAsignarUsuario================
   
       onClickGuardarComisionado: function (button, e, options) {
           
          grid = this.getListaEventosComisionados();
          grid2 = this.getListaAsignarUsuario ();
          grid3 =this.getListaComisionadoEvento();
          winU= this.getWinAsignarUsuario();
       // if (nuevo){     
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();
             
        record = grid.getSelectionModel().getSelection();
        record1 = grid2.getSelectionModel().getSelection(); 
           
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'comisionado/comisionado/registrarComisionado',
            method: 'POST',
            params: {
                idEv: record[0].get('idEv'),
                idUs: record1[0].get('idEmpl')
            },
            success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
                    loadingMask.hide();

                    if (result.success) {
                        grid3.getView().refresh();
                        grid3.getStore().load();
                        winU.close();
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
   // }
   /* else { 
          var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid2.getSelectionModel().getSelection();
           
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'lineamiento/lineamiento/actualizarComisionado',
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

    }*/
       
    },
    onClickLimpiarComisionado: function (button, e, options) {
         
        
    },
});