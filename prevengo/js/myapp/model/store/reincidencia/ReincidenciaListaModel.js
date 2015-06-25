Ext.define('myapp.model.store.reincidencia.ReincidenciaListaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idEv',           type: 'string'},
        {name: 'idRein',           type: 'string'},
        {name: 'descripcion',          type: 'string'},          
	{name: 'fecha',          type: 'string'}, 
        {name: 'anexo',          type: 'string'}, 
        {name: 'direccion',          type: 'string'}, 
    ]
});