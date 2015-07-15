Ext.define('myapp.store.reporte.ReportePorTipoEventoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.reporte.PorTipoEventoModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'reporte/eventoReportes/reportePorTipo',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});