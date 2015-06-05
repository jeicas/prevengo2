Ext.define('myapp.store.empleado.TipoCargo', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.Generico',
    storeId: 'cargarTipoCargo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: BASE_URL + 'ocupacion/tipocargo/cargarTipoCargo',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});