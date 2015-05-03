Ext.define('myapp.model.store.Generico', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type:'int'},
        { name: 'nombre',type:'string'}
    ]
});