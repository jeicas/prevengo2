Ext.define('myapp.store.autorizacion.Estatus', {
    extend: 'Ext.data.Store',
    autoLoad: true,
	fields: ['id', 'nombre'],
    data  : [
        {id: '0', nombre: 'Procesada'},
        {id: '1', nombre: 'Sin Procesar'}
    ]
});