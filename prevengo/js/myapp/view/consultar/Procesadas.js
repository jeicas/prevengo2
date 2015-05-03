Ext.define('myapp.view.consultar.Procesadas', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.procesadas',
  requires: [
   'myapp.view.consultar.ProcesadasLista'
  ],
  layout: {
   	type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [{
      xtype: 'procesadasLista',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
      items: [{
        xtype         : 'combobox',
        width         : 430,
        name          :'dependencia',
        labelWidth    : 90,
        fieldLabel    : 'Dependencia',
        editable      : false,
        store         : Ext.create('myapp.store.empleado.Departamento'),
        valueField    : 'id',
        displayField  : 'nombre',
        emptyText     :'Seleccione',
        queryMode     : 'local',
        allowBlank    : false,
        forceSelection: true,
        triggerAction : 'all'
      },{
        xtype         : 'combobox',
        width         : 280,
        name          :'tipoAutorizacion',
        labelWidth    : 70,
        fieldLabel    : 'Evento',
        editable      : false,
        store         : Ext.create('myapp.store.autorizacion.TipoAutorizacionStore'),
        valueField    : 'id',
        displayField  : 'nombre',
        emptyText     :'Seleccione',
        queryMode     : 'local',
        allowBlank    : false,
        forceSelection: true,
        triggerAction : 'all'
      },{
        xtype     : 'datefield',
        width     : 200,
        labelWidth: 50,
        margins   : '0 0 0 20',
        fieldLabel: 'Fecha',
        name      : 'fechaAutorizacion',
        id        : 'fechaAutorizacion',
        allowBlank: false,
        maxValue  : new Date()
      },{
        xtype   : 'button',
        iconCls :'buscar',
        id      :'buscarProcesadas',
        text    : 'Buscar',
        scope   : this,
      }]
    }]
  }
});