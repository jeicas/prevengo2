Ext.define('myapp.model.store.agente.AgenteListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'nombre'},
        { name: 'estatus'},
    ] 
});