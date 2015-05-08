Ext.define('myapp.store.usuario.UsuarioStore', {
    extend: 'Ext.data.Store',    
    model: 'myapp.model.store.usuario.UsuarioStore',
    
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: BASE_URL + 'avance/avance/obtenerUsuarios',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
