Ext.define('myapp.store.lineamiento.LineamientoEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.lineamiento.LineamientoListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'lineamiento/lineamiento/listaLineamiento',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});