Ext.define('myapp.controller.registrar.EventoController', {
    extend: 'Ext.app.Controller',
    views: ['registrar.Evento'],
    requires: [
        'myapp.util.Util'
    ],
    refs: [{
        ref: 'Evento',
        selector: 'evento'
    
    }],
    
    init: function(application){
        this.control({
            "evento  button[name=btnGuardarEvento]":{
                click: this.onButtonClickGuardarEvento
            
            }
        });
    },
    
 
    
    
    limpiarEvento : function(form){
    var form=this.getEmpleado();
        form.getForm().reset();
       
    },
   
    onButtonClickGuardarEvento: function(button, e ,options){
    me=this;
    formulario=this.getEvento();
        
                var loadingMask = new Ext.LoadMask(Ext.getBody(), { msg: "grabando..." });
                loadingMask.show();
                formulario.getForm().submit({ //AQUI ENVIO LA DATA 
                    url: BASE_URL+'registrar/empleado/guardarEmpleado',
                    method:'POST',
                    params:formulario.getForm().getValues(),
                    success: function(form, action){
                        var result = action.result;           
                        loadingMask.hide();
                       
                    
                        // grid.getView().refresh(true);
                        // grid.getStore().load();
                        if (result.success){
                            myapp.util.Util.showbienMsg(result.msg); 
                           
                            me.limpiarEvento();
                        }else{
                            me.limpiarEvento();
                            myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure : function(form,action){
                    loadingMask.hide();
                       
                            Ext.MessageBox.show({ title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }
                    
                });
    },
    
});