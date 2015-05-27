Ext.define('myapp.model.store.permiso.PermisoModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id',          type: 'string'},
       {name: 'nombre',          type: 'string'},
       {name: 'padre',          type: 'string'},
    ]
});