Ext.define('myapp.model.store.menu.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id',          type: 'string'},
       {name: 'nombre',          type: 'string'},
       {name: 'padre',          type: 'string'},
       {name: 'usuarioNombre',          type: 'string'},
       {name: 'usuarioApellido',          type: 'string'},
       
      
    ]
});