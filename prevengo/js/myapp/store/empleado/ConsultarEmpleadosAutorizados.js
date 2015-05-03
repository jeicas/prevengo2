Ext.define('myapp.store.empleado.ConsultarEmpleadosAutorizados', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.empleado.ConsultarAutorizados',
    groupField: 'dnombre',
    autoLoad: true,
    pageSize: 10,
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'registrar/empleado/obtenerAutorizados',
        reader: {
            type:'json', 
            root: 'data'
        }
    }   
});