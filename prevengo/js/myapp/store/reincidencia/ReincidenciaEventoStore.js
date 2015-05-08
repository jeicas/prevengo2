Ext.define('myapp.store.reincidencia.ReincidenciaEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.reincidencia.ReincidenciaListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'reincidencia/reincidencia/listaReincidencia',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});