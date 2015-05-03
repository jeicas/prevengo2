Ext.define('myapp.model.store.sector.SectorListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'nombre'},
        { name: 'estatus'},
    ] 
});