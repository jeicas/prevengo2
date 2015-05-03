Ext.define('myapp.store.actividad.ActividadEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadListaModel',
    proxy: { 
        type:'ajax',
        params:'',
        url: BASE_URL + 'actividad/actividad/obtenerPlandeAccionDeEvento',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    //autoLoad: true
});