Ext.define('myapp.store.evento.EventoSinIniciarStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.evento.EventoSinIniciarListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'evento/evento/listaEventosSinInciar',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});