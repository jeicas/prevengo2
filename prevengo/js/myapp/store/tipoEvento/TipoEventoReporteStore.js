Ext.define('myapp.store.tipoEvento.TipoEventoReporteStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.tipoEvento.TipoEventoReporteModel',
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