Ext.define('myapp.controller.consultar.AvanceListaController', {
    extend: 'Ext.app.Controller',
    views: ['consultar.ListaAvanceFinal', 
            'consultar.GridConsultarAvances'
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
                ref: 'AvanceListaController',
                selector: 'gridConsultarAvances'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaAvanceFinal button[name=btnAprobarAvance]":{
                click: this.onClickAprobarAvance
            }, 
            "listaAvanceFinal button[name=btnRechazarAvance]":{
                 click: this.onClickRechazarAvance              },
              

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
                        record:record[0].get('id')
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
        
        console.log("id Actividad: ",record[0].get('id'),"id Avance ", record[0].get('idAv'));
        
        if(record[0]){              
                Ext.Ajax.request({
                    url: BASE_URL+'avance/avance/rechazarAvance',
                    method: 'POST',
                    params: {
                        record:record[0].get('id'),
                        idAvance: record[0].get('idAv')
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
                            Ext.MessageBox.show({ title: 'Alerta', msg:'Ha ocurrido un error' , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }


                });                
                             
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar por lo menos un Avance',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
   
                        
              
    },// fin de la function 


});