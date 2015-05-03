Ext.define('myapp.controller.evento.EventoListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventos',
             'evento.WinEvento'
            ],
     requires: [
        'myapp.util.Util'
    ],
    refs: [
           {
             ref: 'ListaEventos',
              selector: 'listaEventos'
             }
           ],
    
    init: function(application) {
        this.control({
            "listaEventos button[name=btnNuevo]":{
                click: this.onClickNuevoEvento
            }, 
 
        }); 
    },   

     onClickNuevoEvento:function (button, e, options) {
         var win= Ext.create('myapp.view.evento.WinEvento');
             
            win.show();
                        
              
    },// fin de la function 
    


});