Ext.define('myapp.model.store.comisionado.ComisionadoListaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idCom',           type: 'string'},
        {name: 'idEv',           type: 'string'},
        {name: 'idUs',           type: 'string'},
        {name: 'nombrecompleto',          type: 'string'},
        {name: 'foto',          type: 'string'},
	{name: 'estatus',          type: 'string'}, 
    	
    ]
});