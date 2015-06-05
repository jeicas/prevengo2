Ext.define('myapp.store.persona.nacionalidadStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,

	fields: ['id', 'nombre'],
    data  : [
        {id: '1', nombre: 'V'},
        {id: '2', nombre: 'E'}
    ]
});