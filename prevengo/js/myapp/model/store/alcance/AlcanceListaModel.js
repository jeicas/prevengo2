Ext.define('myapp.model.store.alcance.AlcanceListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'nombre'},
        { name: 'estatus'},
    ] 
});