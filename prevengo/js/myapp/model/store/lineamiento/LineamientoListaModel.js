Ext.define('myapp.model.store.lineamiento.LineamientoListaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idEv',           type: 'string'},
        {name: 'idLin',           type: 'string'}, 
        {name: 'descripcion',          type: 'string'}, 
        {name: 'fecha',          type: 'string'}, 
	{name: 'estatus',          type: 'string'}, 
    	
    ]
});