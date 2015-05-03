Ext.define('myapp.store.actividad.ActividadEventoAsignarStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.actividad.ActividadListaGridModel',
    //groupField: 'eventoColor',
    proxy: { 
        type:'ajax',
        params:'',
        url: BASE_URL +'actividad/actividad/obtenerEventosConPlandeAccion',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
   autoLoad: true
   
}
                );
        