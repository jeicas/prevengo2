Ext.define('myapp.store.persona.estadoStore', {
    extend: 'Ext.data.Store',
   model: 'myapp.model.store.Generico',
    // storeId: 'cargarEstado',
     autoLoad: true,
    proxy: { 
         type: 'ajax',
        url: BASE_URL + 'ocupacion/estado/cargarEstado',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});