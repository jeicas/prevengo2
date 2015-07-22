Ext.define('myapp.model.store.reporte.PorTipoEventoModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'cantidad',     type: 'int'},
       {name: 'tipo',     type: 'int'},
       {name: 'nombre',       type: 'string'},
       {name: 'Completado',     type: 'int'},
       {name: 'Pendiente',     type: 'int'},
       {name: 'En Ejecucion',     type: 'int'},
       {name: 'avance',     type: 'string'},
       {name: 'estatus',     type: 'string'},
        
    ]
});
