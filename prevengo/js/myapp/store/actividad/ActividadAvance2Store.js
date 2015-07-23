Ext.define('myapp.store.actividad.ActividadAvance2Store', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadAvanceListaModel',
    groupField: 'actividad',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'actividad/actividad/listaActivadesAvancesPorEvento2',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
   
});