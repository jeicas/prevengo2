Ext.define('myapp.store.actividad.ActividadAvanceStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadAvanceListaModel',
    groupField: 'actividad',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'actividad/actividad/listaActivadesAvancesPorEvento',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});