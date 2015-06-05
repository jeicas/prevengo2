Ext.define('myapp.store.persona.municipioStore', {
    extend: 'Ext.data.Store',
   model: 'myapp.model.store.Generico',
   
    autoLoad: true,
    proxy: { 
         type: 'ajax',
        url: BASE_URL + 'ocupacion/municipio/cargarMunicipio',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});