Ext.define('myapp.store.reporte.CalcularNivelEjecucionStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.reporte.CalcularAvanceTotalModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'reporte/eventoReportes/calcularNivelEjecucion',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});