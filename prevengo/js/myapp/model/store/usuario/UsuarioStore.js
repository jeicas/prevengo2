Ext.define('myapp.model.store.usuario.UsuarioStore', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [    
        { name: 'id' }, 
        { name: 'usuario' },
        { name: 'password' },
        { name: 'tipousuario' },
        { name: 'ntipousuario' },
        { name: 'cedula' },
        { name: 'nacionalidad' },
        { name: 'apellido' },
        { name: 'correo' },
        { name: 'nombre' },
        { name: 'foto' },
        { name: 'status' },
        { name: 'fotoo' }
    ] 
});