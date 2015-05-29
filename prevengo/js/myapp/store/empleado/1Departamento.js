Ext.define('myapp.store.empleado.1Departamento', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.Generico',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'pdfs/reportegeneral/buscarDepartamentoActual',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});