Ext.define('myapp.store.evento.EventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.evento.EventoListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'evento/evento/listaEventos',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});