Ext.define('myapp.controller.actividad.ListaPlanEventoAsignarEjecutorController', {
    extend: 'Ext.app.Controller',
    views: ['actividad.ListaPlanEventoAsignarEjecutor',
            'actividad.ListaEmpleadoPlan',
             'avance.WinAsignarUsuario'
            ],
     requires: [
        'myapp.util.Util'
    ],
    refs: [
           {
             ref: 'ListaPlanEventoAsignarEjecutor',
              selector: 'listaPlanEventoAsignarEjecutor'
             },
             {
              ref: 'ListaEmpleadoPlan',
              selector: 'listaEmpleadoPlan'
             },
             {
              ref: 'WinAsignarUsuario',
              selector: 'winAsignarUsuario'
             },
             {
              ref: 'ListaAsignarUsuario',
              selector: 'listaAsignarUsuario'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaPlanEventoAsignarEjecutor":{
                itemdblclick: this.onClickNuevaAsignacion
            },
            "listaEmpleadoPlan button[name=btnAsignarEmpleado]":{
                click: this.onClickAsignarEmpleado
            },
             "listaAsignarUsuario button[name=btnGuardar]":{
                click: this.onClickGuardarEmpleado
            } 
            
        }); 
    },   

     onClickNuevaAsignacion:function (record, item, index, e, eOpts ) {
        var win = Ext.create('myapp.view.actividad.WinAsignarEjecutorAPlan');      
            newGrid=this.getListaEmpleadoPlan();
            store= newGrid.getStore();      
            store.proxy.extraParams.id=item.data.idAct;
            store.load();
           // newGrid.down("label[name=lblIdActividad]").setText(item.data.idAct);
            win.setTitle("Asignar Empleados al plan de accion: "+ item.data.actividad);
            win.show();
              
    },// fin de la function 
    
    onClickAsignarEmpleado:function(button, e, options) {
        var win = Ext.create('myapp.view.avance.WinAsignarUsuario');
         win.setTitle("Asignar Nuevo Empleado");
         win.show();    
       },// fin de la function
       
       
       onClickGuardarEmpleado:function(button, e, options) {
         var grid1 = this.getListaEmpleadoPlan();
         var gridUsu= this.getListaAsignarUsuario();
         var win = this.getWinAsignarUsuario();
         record = gridUsu.getSelectionModel().getSelection();
       
        
       
        
        if(record[0]){
                    
                Ext.Ajax.request({
                    url: BASE_URL+'avance/avance/asignarEmpleado',
                    method: 'POST',
                    params: {
                        user:record[0].get('id'),
                        activ:grid1.down("label[name=lblIdActividad]").getEl().dom.textContent,
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                              Ext.MessageBox.show({ title: 'Mensaje', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                                grid1.getView().refresh();
                                grid1.getStore().load();
                                win.close();
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
            msg: 'Debe seleccionar un Empleado',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
       },// fin de la function
    


});