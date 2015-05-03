Ext.define('myapp.store.empleado.EmpleadoStore', {
    extend:'Ext.data.Store',
    model : "myapp.model.store.empleado.EmpleadoStore",
    proxy: {
        type: 'ajax',
        url :  BASE_URL + 'registrar/empleado/obtenerEmpleado',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});