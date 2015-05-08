Ext.define('myapp.store.actividad.PlandeAccionStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadListaGridModel',
    groupField: 'eventoColor',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'actividad/actividad/obtenerPlandeAccionEvento',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});