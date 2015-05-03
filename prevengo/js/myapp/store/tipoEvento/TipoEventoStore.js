Ext.define('myapp.store.tipoEvento.TipoEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.tipoEvento.TipoEventoListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'tipoEvento/tipoEvento/obtenerTipoEvento',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});