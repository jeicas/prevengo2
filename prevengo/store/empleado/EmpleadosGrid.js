Ext.define('myapp.store.empleado.EmpleadosGrid', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.empleado.EmpleadosGrid',
    pageSize: 10,    
    autoLoad: true,
    groupField: 'dnombre',    
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'registrar/empleado/obtenerEmpleadosGrid',
        reader: {
            type:'json', 
            root: 'data'
        }
    }
});