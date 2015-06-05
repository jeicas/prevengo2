Ext.define('myapp.store.autorizacion.MotivoAutorizacionStore', {	
	extend: 'Ext.data.Store',
    autoLoad: true,
	fields: ['id','nombre'],
    data:[
    	{id: '1' ,nombre: 'PERSONAL'},
    	{id: '2' ,nombre: 'LABORAL'},
    	{id: '3' ,nombre: 'MEDICO'},
    	{id: '4' ,nombre: 'ESTUDIO'},
    	{id: '5' ,nombre: 'SINDICAL'}
    ]
});