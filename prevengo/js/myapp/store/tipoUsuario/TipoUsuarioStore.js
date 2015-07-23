Ext.define('myapp.store.tipoUsuario.TipoUsuarioStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.generico.GenericoModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'tipoUsuario/tipoUsuario/obtenerTipoUsuario',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});