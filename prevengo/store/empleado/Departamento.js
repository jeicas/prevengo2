Ext.define('myapp.store.empleado.Departamento', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.Generico',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'ocupacion/dependencia/cargarDependencia',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});