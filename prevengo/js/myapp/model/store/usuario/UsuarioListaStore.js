Ext.define('myapp.model.store.usuario.UsuarioStore', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [    
        { name: 'id' }, 
        { name: 'cedula' },
         { name: 'idEmpl' },
        { name: 'foto' },
        { name: 'nombrecompleto' },
        { name: 'apellido' },
        { name: 'ente' },
        { name: 'division' },
        { name: 'tipousuario' },
 
    ] 
});