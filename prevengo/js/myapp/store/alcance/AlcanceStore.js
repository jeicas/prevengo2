Ext.define('myapp.store.alcance.AlcanceStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.alcance.AlcanceListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'alcance/alcance/obtenerAlcance',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});