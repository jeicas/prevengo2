Ext.define('myapp.store.evento.EventoResponsableStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.evento.EventoResponsableModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'evento/evento/listaEventoResponsable',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});