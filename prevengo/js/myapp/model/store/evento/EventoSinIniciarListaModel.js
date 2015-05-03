Ext.define('myapp.model.store.evento.EventoSinIniciarListaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idEv',           type: 'string'},
        {name: 'titulo',          type: 'string'}, 
        {name: 'descripcion',          type: 'string'},         
	{name: 'fechaEvento',          type: 'string'},
	{name: 'fechaPreAviso',          type: 'string'}, 
	{name: 'presupuesto',          type: 'string'},  
	{name: 'estatus',          type: 'string'}, 
    	
    ]
});