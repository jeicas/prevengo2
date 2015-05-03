Ext.define('myapp.store.seguridad.Status', {
    extend: 'Ext.data.Store',
    autoLoad: true,

fields: ['id', 'nombre'],
    data  : [
        {id: '1', nombre: 'Activo'},
        {id: '0', nombre: 'Inactivo'}
    ]
});