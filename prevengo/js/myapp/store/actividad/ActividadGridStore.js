Ext.define('myapp.store.actividad.ActividadGridStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadListaGridModel',
    groupField: 'evento',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'actividad/actividad/obtenerEventosConPlandeAccion',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});