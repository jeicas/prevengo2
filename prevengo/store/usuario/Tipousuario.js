Ext.define('myapp.store.usuario.Tipousuario', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.usuario.Tipousuario',
    storeId: 'tipousuario',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: BASE_URL + 'registrar/usuario/tipousuario',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
