Ext.define('myapp.store.evento.EventoLineamientoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.evento.EventoListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'evento/evento/listaEventoTodo',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});