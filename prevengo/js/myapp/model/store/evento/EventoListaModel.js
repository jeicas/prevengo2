Ext.define('myapp.model.store.evento.EventoListaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idEv',           type: 'string'},
        {name: 'titulo',          type: 'string'}, 
        {name: 'descripcion',          type: 'string'},         
	{name: 'fechaEvento',          type: 'string'},
	{name: 'fechaPreAviso',          type: 'string'},
	{name: 'agente',          type: 'string'}, 
	{name: 'tipoEvento',          type: 'string'}, 
	{name: 'alcance',          type: 'string'}, 
	{name: 'sector',          type: 'string'}, 
	{name: 'presupuesto',          type: 'string'},  
	{name: 'estatus',          type: 'string'}, 
    	
    ]
});