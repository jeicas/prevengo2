Ext.define('myapp.model.store.empleado.ConsultarAutorizados', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'nacionalidad'},
        { name: 'cedula'},
        { name: 'id'},
        { name: 'estado'},
        { name: 'tipo'},
        { name: 'nombre'},
        { name: 'dnombre'},
        { name: 'apellido'},
        { name: 'tipoautorizacion'},
        { name: 'motivoautorizacion'},
        { name: 'fechaautorizacion'},
        { name: 'horaentrada'},
        { name: 'horasalida'},
        { name: 'foto'},
        { name: 'telefono1'},
        { name: 'telefono2'},
        { name: 'correo'}
    ] 
});