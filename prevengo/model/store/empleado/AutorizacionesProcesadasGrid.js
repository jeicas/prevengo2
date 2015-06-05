Ext.define('myapp.model.store.empleado.AutorizacionesProcesadasGrid', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'foto'},
        { name: 'nacionalidad'},
        { name: 'cedula'}, 
        { name: 'nombrecompleto'},
        //{ name: 'apellido'},
        { name: 'fechaautorizacion'},
        { name: 'tipoautorizacion'},
        { name: 'placa'},
        { name: 'horaentrada'},
        { name: 'horasalida'},
        { name: 'dependencia'},
        { name: 'jefe'},
        { name: 'fechaestatus'}
    ] 
});