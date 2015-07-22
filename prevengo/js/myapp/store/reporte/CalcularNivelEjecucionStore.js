Ext.define('myapp.store.reporte.CalcularNivelEjecucionStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.reporte.CalcularNivelEjecucionlModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'reporte/eventoReportes/calcularNivelEjecucion',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
   
});