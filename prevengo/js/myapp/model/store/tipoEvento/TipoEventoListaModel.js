Ext.define('myapp.model.store.tipoEvento.TipoEventoListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'nombre'},
        { name: 'estatus'},
    ] 
});