Ext.define('myapp.store.avance.AvanceFinalStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.avance.AvanceListaModel',
    groupField: 'evento',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'avance/avance/cargarAvanceFinal',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});

