Ext.define('myapp.store.avance.AvanceStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.avance.AvanceListaModel',
    groupField: 'actividad',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'avance/avance/cargarGridAvance',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});



