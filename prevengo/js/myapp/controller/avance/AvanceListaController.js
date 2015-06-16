Ext.define('myapp.controller.avance.AvanceListaController', {
    extend: 'Ext.app.Controller',
    views: ['avance.ListaAvanceFinal', 
            'avance.GridConsultarAvances'
            ],
     requires: [
        'myapp.util.Util'
    ],
    refs: [
           {
             ref: 'ListaAvanceFinal',
              selector: 'listaAvanceFinal'
             },
             {
                ref: 'WinAvanceFinal',
                selector: 'ventanaAvanceFinal'
             },
             {
                ref: 'GridConsultarAvances',
                selector: 'gridConsultarAvances'
             },
             {
                ref: 'WinObservacionAvanceRechazado',
                selector: 'winObservacionAvanceRechazado'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaAvanceFinal button[name=btnAprobarAvance]":{
                click: this.onClickAprobarAvance
            }, 
             
            "listaAvanceFinal button[name=btnRechazarAvance]":{
                 click: this.onClickRechazarAvance              },
             
             "winObservacionAvanceRechazado button[name=btnGuardar]": {
                click: this.onClickGuardarObservacionRechazar
            }, 
            
              "winObservacionAvanceRechazad button[name=btnGuardar]": {
                click: this.onClickSalir
            },   

        }); 
    },   

     onClickAprobarAvance:function (button, e, options) {
         var grid = this.getListaAvanceFinal();
         var win = this.getWinAvanceFinal();
         record = grid.getSelectionModel().getSelection();
        // record = Ext.util.JSON.encode(record);
       
        if(record[0]){
                Ext.Ajax.request({
                    url: BASE_URL+'actividad/actividad/aprobarActividad',
                    method: 'POST',
                    params: {
                        record:record[0].get('id'),
                        idAvance:record[0].get('idAv')
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
                            Ext.MessageBox.show({ title: 'Alerta', msg:data.msg , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }


                });                
                             
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar por lo menos un Avance',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
   
                        
              
    },// fin de la function 
     onClickRechazarAvance:function (button, e, options) {
         var grid = this.getListaAvanceFinal();
         var win = this.getWinAvanceFinal();
         record = grid.getSelectionModel().getSelection();
        // record = Ext.util.JSON.encode(record);
        
       
        
        if(record[0]){
            
             Ext.Msg.show({
                    title: 'Confirmar',
                    msg: 'Esta seguro que desea CANCELAR el Evento ' + record[0].get('descripcion') + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (buttonId) {
                        if (buttonId == 'yes') {
                            var win = Ext.create('myapp.view.observacion.WinObservacionAvanceRechazado');
                            win.setTitle("Rechazar el Avance " + record[0].get('descripcion'));
                            win.down('label[name=lblDescripcion]').setText("Indique la razón por cual rechaza el avance");
                            win.show();
                        }
                    }
                });               
                             
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar por lo menos un Avance',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
   
                        
              
    },// fin de la function 
    
    
 onClickGuardarObservacionRechazar: function (button, e, options) {

         var grid = this.getListaAvanceFinal();
         record = grid.getSelectionModel().getSelection();
         winO = this.getWinObservacionAvanceRechazado();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();
        Ext.Ajax.request({//AQUI ENVIO LA DATA 
             url: BASE_URL+'avance/avance/rechazarAvance',
            method: 'POST',
            params: {
                record:record[0].get('id'),
                idAvance: record[0].get('idAv'),
                observacion: winO.down("textfield[name=txtDescripcion]").getValue(),
               
            },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                loadingMask.hide();

                if (result.success) {
                    grid.getView().refresh();
                    grid.getStore().load();
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


    },
    
 
});