Ext.define('myapp.store.usuario.Status', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data  : [
        {id: '1', nombre: 'Activo'},
        {id: '0', nombre: 'Inactivo'}
    ]
});