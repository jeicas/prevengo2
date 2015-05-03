Ext.define('myapp.model.store.actividad.ActividadListaGridModel', { 
   extend: 'Ext.data.Model',
   idProperty: 'id',
    fields: [
        { name: 'id'},
        { name: 'evento'},
        { name: 'descripcion'},
        { name: 'fecha'},
        {name:  'idAct'},
        { name: 'fechaAct'},
        {name:  'actividad'},
        {name:  'estatus'},
        {name:  'eventoColor'},
    ] 
});