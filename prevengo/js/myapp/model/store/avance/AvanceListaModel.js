Ext.define('myapp.model.store.avance.AvanceListaModel', { 
   extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id'}, 
        { name: 'idAv'},
        { name: 'idUs'}, 
        { name: 'evento'},
        { name: 'actividad'},
        { name: 'descripcion'},
        { name: 'tipo'},
        { name: 'fecha'},
        { name: 'nombre'},
        { name: 'apellido'},
        { name: 'observacion'},
        { name: 'estatus'},
    ] 
});