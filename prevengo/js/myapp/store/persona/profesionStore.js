Ext.define('myapp.store.persona.profesionStore', {
    extend: 'Ext.data.Store',
   model: 'myapp.model.store.Generico',
   
    autoLoad: true,
    proxy: { 
         type: 'ajax',
         url: BASE_URL + 'ocupacion/profesion/cargarProfesion',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});