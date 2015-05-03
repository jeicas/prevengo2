Ext.define('myapp.store.tipoAvance.TipoAvanceStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
	fields: ['id', 'nombre'],
    data  : [
        {id: '0', nombre: 'Final'},
        {id: '1', nombre: 'Parcial'}
    ]
});
