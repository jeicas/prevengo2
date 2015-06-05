Ext.define('myapp.store.seguridad.Tipousuario', {
    extend: 'Ext.data.Store',
    requires: [
        'myapp.model.seguridad.Tipousuario'
    ],
    model: 'myapp.model.seguridad.Tipousuario',
    storeId: 'tipousuario',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: BASE_URL + 'seguridad/usuario/tipousuario',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
