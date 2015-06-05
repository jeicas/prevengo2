Ext.define('myapp.store.persona.sexoStore', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre'],
    data: [
		{id:'1', nombre:'Femenino'},
		{id:'2', nombre:'Masculino'}
    ]
});