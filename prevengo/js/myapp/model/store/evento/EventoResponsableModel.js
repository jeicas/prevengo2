Ext.define('myapp.model.store.evento.EventoResponsableModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idEv',           type: 'string'},
        {name: 'idUs',           type: 'string'},
        {name: 'titulo',          type: 'string'}, 
        {name: 'descripcion',          type: 'string'},         
	{name: 'fechaEvento',          type: 'string'},
        { name: 'cedula' ,          type: 'string'},
	{name: 'nombrecompleto',          type: 'string'},
      
        {name: 'cargo',          type: 'string'},
         { name: 'ente', type: 'string' },
        { name: 'division', type: 'string' },
	{name: 'foto',          type: 'string'},
	{name: 'estatus',          type: 'string'}, 
    	
    ]
});