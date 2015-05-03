Ext.define('myapp.store.seguridad.Usuario', {
    extend: 'Ext.data.Store',
    requires: ['myapp.model.seguridad.Usuario' ],
    model: 'myapp.model.seguridad.Usuario', // #2
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'seguridad/usuario/buscarusuario',
        reader: { 
            type: 'json', 
            root: 'data'   
        }  
    },
    autoLoad: true
});