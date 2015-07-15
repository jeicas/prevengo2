Ext.define('myapp.model.store.reporte.PorTipoEventoModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id',     type: 'int'},
       {name: 'nombre',       type: 'string'},
       {name: 'cantidad0',     type: 'int'},
       {name: 'cantidad1',     type: 'int'},
       {name: 'cantidad2',     type: 'int'},
       {name: 'estatus',     type: 'string'},
        
    ]
});
