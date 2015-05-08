Ext.define('myapp.store.ente.EnteStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.generico.GenericoModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'ente/ente/obtenerEnte',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});