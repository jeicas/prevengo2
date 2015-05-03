Ext.define('myapp.view.registrar.GridbuscarEmpleado', {
extend: 'Ext.window.Window',
  alias: 'widget.gridbuscarempleado',
  itemId: 'gridbuscarempleado',
  height: 650,
  width: 800,
  modal:true,
  requires: [
   'myapp.view.registrar.Gridbuscaremplistado'
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
      xtype: 'gridbuscaremplistado',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
    }]
  }
});