Ext.define('myapp.model.store.empleado.EmpleadoStore', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cedula',           type: 'string'},
    	{name: 'nombres',          type: 'string'},
    	{name: 'apellidos',        type: 'string'},
        {name: 'fechanacimiento',  type: 'string'},
        {name: 'direccion',        type: 'string'},
        {name: 'codTlf1',          type: 'string'},
        {name: 'movil',            type: 'string'},
        {name: 'codTlf2',          type: 'string'},
        {name: 'local',            type: 'string'},
    	{name: 'sexo',             type: 'string'},
    	{name: 'correo',           type: 'string'},
        { name: 'foto',            type: 'string' },
        { name: 'status' ,         type: 'string'},
        { name: 'eestatus' ,       type: 'int'},
        { name: 'fotoo' ,          type: 'string'},
        { name: 'cmbtiponomina',   type: 'int' },
        { name: 'cmbcargo' ,       type: 'int'},
        { name: 'nombredepartamento', type: 'string'},
        { name: 'cmbdepartamento', type: 'int'},
        { name: 'departamentoUsuario', type: 'int'},
        { name: 'departamentoanterior', type: 'int'}
    ]
});