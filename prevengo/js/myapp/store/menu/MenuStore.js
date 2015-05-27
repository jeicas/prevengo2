Ext.define('myapp.store.menu.MenuStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.menu.MenuModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'tipoUsuario/tipoUsuario/obtenerMenu',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});