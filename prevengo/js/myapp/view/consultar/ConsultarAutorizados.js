Ext.define('myapp.view.consultar.ConsultarAutorizados', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.consultarautorizados',
  requires: [
   'myapp.view.consultar.ConsultarAutorizadosLista'
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
      xtype: 'consultarautorizadosLista',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
      items: [{
        xtype         : 'combobox',
        width         : 340,
        name          :'tipo',
        labelWidth    : 80,
        fieldLabel    : 'Autorizacion',
        editable      : false,
        store         : Ext.create('myapp.store.autorizacion.TipoAutorizacionStore'),
        valueField    : 'id',
        displayField  : 'nombre',
        emptyText     :'Seleccione',
        queryMode     : 'local',
        allowBlank    : false,
        forceSelection: true,
        triggerAction : 'all',
        margins       : '0 0 0 20'
      },{
        xtype         : 'combobox',
        width         : 155,
        name          :'motivo',
        labelWidth    : 40,
        fieldLabel    : 'Motivo', 
        editable      : false,
        store         : Ext.create('myapp.store.autorizacion.MotivoAutorizacionStore'),
        valueField    : 'id',
        displayField  : 'nombre',
        emptyText     :'Seleccione',
        queryMode     : 'local',
        allowBlank    : false,
        forceSelection: true,
        margins       : '0 0 0 20',
        triggerAction : 'all'
      },{
        xtype         : 'combobox',
        width         : 155,
        name          :'estado',
        labelWidth    : 40,
        fieldLabel    : 'Estado', 
        editable      : false,
        store         : Ext.create('myapp.store.autorizacion.Estatus'),
        valueField    : 'id',
        displayField  : 'nombre',
        emptyText     :'Seleccione',
        queryMode     : 'local',
        allowBlank    : false,
        forceSelection: true,
        margins       : '0 0 0 20',
        triggerAction : 'all'
      },{
        xtype     : 'datefield',
        width     : 145,
        margins   : '0 0 0 20',
        labelWidth: 40,
        fieldLabel: 'Desde',
        name      : 'fechaDesde',
        id        : 'fechaDesde',
        allowBlank: false,
        value     : new Date()
      },{
        xtype     : 'datefield',
        width     : 145,
        labelWidth: 40,
        fieldLabel: 'Hasta',
        name      : 'fechaHasta',
        id        : 'fechaHasta',
        allowBlank: false,
        value     : new Date()
      },{
        xtype   : 'button',
        iconCls : 'buscar',
        tooltip : 'Buscar',
        id      :'buscarAutorizacion',
        scope   : this,
      },{
        xtype   : 'button',
        iconCls : 'icon-limpiar',
        tooltip : 'Limpiar',
        id      :'limpiar',
        scope   : this,
      }]
    }]
  }
});