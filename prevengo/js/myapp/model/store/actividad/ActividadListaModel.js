Ext.define('myapp.model.store.actividad.ActividadListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'descripcion'},
        { name: 'fecha'},
        { name: 'fechaPA'},
        { name: 'depende'},
        { name: 'evento'},
        { name: 'observacion'},
        { name: 'estatus'},
    ] 
});