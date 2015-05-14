Ext.define('myapp.model.store.actividad.ActividadAvanceListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'idAct'},
        { name: 'actividad'},
        { name: 'responsable'},
        { name: 'avance'},
        { name: 'tipoEvento'},
        { name: 'fecha'},
        { name: 'ejecutor'},
        { name: 'estatus'},
    ] 
});