Ext.define('myapp.store.reporte.CalcularAvanceTotalStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.reporte.CalcularAvanceTotalModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'reporte/eventoReportes/calcularAvanceTotal',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});