Ext.define('myapp.store.actividad.ActividadStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'actividad/actividad/obtenerPlandeAccion',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});