Ext.define('myapp.store.agente.AgenteStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.agente.AgenteListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'agente/agente/obtenerAgente',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});