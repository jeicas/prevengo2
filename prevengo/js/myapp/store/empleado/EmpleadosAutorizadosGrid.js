Ext.define('myapp.store.empleado.EmpleadosAutorizadosGrid', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.empleado.EmpleadosAutorizadosGrid',
    groupField: 'jefe',    
    autoLoad: true,
    pageSize: 10,
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'registrar/empleado/obtenerEmpleadosAutorizados',
        reader: {
            type:'json', 
            root: 'data'
        }
    }
});