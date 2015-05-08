Ext.define('myapp.store.comisionado.ComisionadoEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.comisionado.ComisionadoListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'comisionado/comisionado/listaComisionado',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});