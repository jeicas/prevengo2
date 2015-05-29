Ext.define('myapp.store.persona.parroquiaStore', {
    extend: 'Ext.data.Store',
   model: 'myapp.model.store.Generico',
   
    autoLoad: true,
    proxy: { 
         type: 'ajax',
        url: BASE_URL + 'ocupacion/parroquia/cargarParroquia',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});