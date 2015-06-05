Ext.define('myapp.model.session.Traersession', {
    
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'nacionalidad' },
        { name: 'cedula' }
    ]
});