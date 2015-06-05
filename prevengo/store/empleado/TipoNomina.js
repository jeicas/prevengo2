Ext.define('myapp.store.empleado.TipoNomina', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.Generico',
    storeId: 'cargarTipoNomina',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: BASE_URL + 'ocupacion/tiponomina/cargarTipoNomina',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});