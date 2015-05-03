Ext.define('myapp.controller.actividad.ListaPlanEventoAsignarEjecutorController', {
    extend: 'Ext.app.Controller',
    views: ['actividad.ListaPlanEventoAsignarEjecutor',
             
            ],
     requires: [
        'myapp.util.Util'
    ],
    refs: [
           {
             ref: 'ListaPlanEventoAsignarEjecutor',
              selector: 'listaPlanEventoAsignarEjecutor'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaEventoSinIniciar button[name=Asignar Ejecutor]":{
                click: this.onClickNuevaAsignacion
            }, 
 
        }); 
    },   

     onClickNuevaAsignacion:function (button, e, options) {
         /*var win= Ext.create('myapp.view.actividad.');
            win.setTitle("Asignar Ejecutor a plan del Evento:"); 
            win.show();*/
                        
              
    },// fin de la function 
    


});