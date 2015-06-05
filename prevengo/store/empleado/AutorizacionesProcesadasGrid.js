Ext.define('myapp.store.empleado.AutorizacionesProcesadasGrid', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.empleado.AutorizacionesProcesadasGrid',
    groupField: 'jefe',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'registrar/empleado/obtenerEmpleadosProcesados',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});