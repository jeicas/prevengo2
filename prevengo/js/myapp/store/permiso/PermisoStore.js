Ext.define('myapp.store.permiso.PermisoStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.permiso.PermisoModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'permiso/permiso/obtenerMenuConPermiso',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
  
});