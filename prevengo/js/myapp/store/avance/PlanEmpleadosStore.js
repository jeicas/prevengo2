Ext.define('myapp.store.avance.PlanEmpleadosStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.avance.ListaEmpleadoPlanModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'avance/avance/obtenerEmpleadosConPlan',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    //autoLoad: true
});