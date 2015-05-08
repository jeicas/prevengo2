Ext.define('myapp.model.store.actividad.ActividadListaGridModel', { 
   extend: 'Ext.data.Model',
   idProperty: 'id',
    fields: [
        { name: 'idEvento', type: 'INT'},
        { name: 'evento', type: 'STRING'},
        { name: 'descripcion', type: 'STRING'},
        { name: 'fecha', type: 'STRING'},
        {name:  'idAct', type: 'INT'},
        { name: 'fechaAct', type: 'STRING'  },
        {name:  'actividad', type: 'STRING'},
        {name:  'estatus', type: 'STRING'},
        {name:  'eventoColor',type: 'STRING'},
    ] 
});