Ext.define('myapp.controller.seguridad.PermisoController', {
    extend: 'Ext.app.Controller',
    views: ['seguridad.PermisoForm',
            
             
            ],
     requires: [
        'myapp.util.Util'
        
    ],
   
    refs: [
           {
              ref: 'ListaActividad',
              selector: 'listaActividad'
             },
              {
              ref: 'ListaPlanEvento',
              selector: 'listaPlanEvento'
             },
             
            
           ],
    
    init: function(application) {
        this.control({
            "listaActividad":{
                itemdblclick: this.onClickVerPlan
            },
            "winActividad checkbox[name=cbfDepende]":{
                selection: this.cargarActividad
            }
        }); 
    },   

   



 onClickVerPlan: function (record, item, index, e, eOpts ){
    
    var win = Ext.create('myapp.view.actividad.WinPlanEvento'); 
          
     newGrid=this.getListaPlanEvento();
      store= newGrid.getStore();      
      store.proxy.extraParams.id=item.data.idEvento;
      store.load();
      newGrid.down("label[name=lblIdEvento]").setText(item.data.idEvento);
      win.setTitle("Plan de Accion para el Evento: "+ item.data.evento);
      win.show();
      
  },
   onClickVerPlan2: function (record, item, index, e, eOpts ){
    
    var win = Ext.create('myapp.view.actividad.WinPlanEvento'); 
          
     newGrid=this.getListaPlanEvento();
      store= newGrid.getStore();      
      store.proxy.extraParams.id=item.data.idEvento;
      store.load();
      newGrid.down("label[name=lblIdEvento]").setText(item.data.idEvento);
      win.setTitle("Plan de Accion para el Evento: "+ item.data.evento);
      win.show();
      
  }
  
  
  
});



