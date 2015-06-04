Ext.define('myapp.model.store.avance.AvanceListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'},
         { name: 'idAct'},
        { name: 'idAv'},
        { name: 'idUs'}, 
        { name: 'evento'},
        { name: 'actividad'},
        { name: 'actividadTitle'},
        { name: 'descripcion'},
        { name: 'tipo'},
        { name: 'costo'},
        { name: 'fecha'},
        { name: 'fechaAsignacion'},
        { name: 'nombre'},
        { name: 'apellido'},
        { name: 'observacion'},
        { name: 'estatus'},
    ] 
});