var nuevo=false;

Ext.define('myapp.controller.actividad.ListaPlanEventoController', {
    extend: 'Ext.app.Controller',
    views: ['actividad.ListaPlanEvento',
            'actividad.ActividadForm',
            'actividad.WinActividad',
            
            ],
     requires: [
        'myapp.util.Util'       
    ],
    refs: [
           {
              ref: 'ListaPlanEvento',
              selector: 'listaPlanEvento'
             },
             {
              ref: 'ActividadForm',
              selector: 'actividadForm'
             },
             {
              ref: 'WinActividad',
              selector: 'winActividad'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaPlanEvento button[name=btnNuevoPlan]":{
                click: this.onClickNuevoPlan
            },
            "listaPlanEvento button[name=btnEditarPlan]":{
                click: this.onClickEditarPlan
            },
              "winActividad button[name=btnGuardar]":{
                click: this.onClickGuardarPlan
            },
             "actividadForm checkboxfield[name=cbfDepende]":{
                change: this.cargarActividad
            }

        }); 
    },   


//=======================Funciones de la ListaPlanEvento=========================================

    onClickNuevoPlan:function(button, e, options) {
     nuevo=true;
        var win = Ext.create('myapp.view.actividad.WinActividad');
            
         win.setTitle("Nueva Actividad");
         win.show();
            
       },// fin de la function

     onClickEditarPlan:function(button, e, options) {
        nuevo=false;
        var grid = this.getListaPlanEvento(),
        record = grid.getSelectionModel().getSelection();
        if(record[0]){
            var editWindow = Ext.create('myapp.view.actividad.WinActividad');
           editWindow.setTitle("Actualizar Actividad");
            editWindow.down('actividadForm').getForm().reset();
            editWindow.down('actividadForm').loadRecord(record[0]);
            editWindow.down('textareafield[name=txtDescripcion]').setReadOnly(true);
            editWindow.show();
        }
        else 
        {
            
        }
       },// fin de la function

//=======================Funciones del WinActividad=========================================

        onClickGuardarPlan:function(button, e, options) {
              formulario=this.getActividadForm();
              win=this.getWinActividad();
              grid=this.getListaPlanEvento();
 
              var loadingMask = new Ext.LoadMask(Ext.getBody(), { msg: "grabando..." });
                loadingMask.show();
                
              
                if (nuevo){
                    
                    
                    formulario.getForm().submit({ //AQUI ENVIO LA DATA 
                    url: BASE_URL+'actividad/actividad/registrarActividad',
                    method:'POST',
                    params:
                      {
                         txtDescripcion:  formulario.down("textfield[name=txtDescripcion]").getValue(),
                         dtfFechaT: formulario.down("textfield[name=dtfFechaT]").getValue(),
                         dtfFechaPA: formulario.down("textfield[name=dtfFechaPA]").getValue(),
                         cmbActividadDepende:formulario.down("combobox[name=cmbActividadDepende]").getValue(),
                         lblIdEvent:grid.down("label[name=lblIdEvento]").getEl().dom.textContent,
                        
                      },
                    
 
                    success: function(form, action){
                        var result = action.result;           
                        loadingMask.hide();
                       
                        if (result.success){
                               grid.getView().refresh();
                               grid.getStore().load();
                               Ext.MessageBox.show({ title: 'Alerta', msg:  result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                               win.close();
                               
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(form,action){
                    var result = action.result;    
                     loadingMask.hide();
                            Ext.MessageBox.show({ title: 'Alerta', msg:"Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador" , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }
                    
                });
               }
               else
               {
                   
                   formulario.getForm().submit({ //AQUI ENVIO LA DATA 
                    url: BASE_URL+'actividad/actividad/actualizarActividad',
                    method:'POST',
                    params:
                      {
                         txtDescripcion:  formulario.down("textfield[name=txtDescripcion]").getValue(),
                         dtfFechaT: formulario.down("textfield[name=dtfFechaT]").getValue(),
                         dtfFechaPA: formulario.down("textfield[name=dtfFechaPA]").getValue(),
                         cmbActividadDepende:formulario.down("combobox[name=cmbActividadDepende]").getValue(),
                         
                      },
                    
 
                    success: function(form, action){
                        var result = action.result;           
                        loadingMask.hide();
                       
                        if (result.success){
                               grid.getView().refresh();
                               grid.getStore().load();
                               Ext.MessageBox.show({ title: 'Alerta', msg:  result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                               win.close();
                               
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(form,action){
                    var result = action.result;    
                     loadingMask.hide();
                            Ext.MessageBox.show({ title: 'Alerta', msg:"Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador" , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }
                    
                });
               }
                 
                 
       },// fin de la function
       
   cargarActividad:function (){
          nuevo= this.getListaPlanEvento(); 
          evento=nuevo.down("label[name=lblIdEvento]").getEl().dom.textContent; 

     if (Ext.ComponentQuery.query('actividadForm checkboxfield[name=cbfDepende]')[0].getValue() == true){
         Ext.ComponentQuery.query('actividadForm combobox[name=cmbActividadDepende]')[0].setDisabled(false);
          store= Ext.ComponentQuery.query('actividadForm combobox[name=cmbActividadDepende]')[0].getStore();  
          store.proxy.extraParams.id=evento;
          store.load();
          
   } else {
       Ext.ComponentQuery.query('winActividad combobox[name=cmbActividadDepende]')[0].setDisabled(true);
   }
       
        
  }
});