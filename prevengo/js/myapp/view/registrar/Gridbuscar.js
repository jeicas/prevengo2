Ext.define('myapp.view.registrar.Gridbuscar', {
extend: 'Ext.window.Window',
  alias: 'widget.gridbuscar',
  itemId: 'gridbuscar',
  title:'Avance',
  height: 350,
  width: 690,
  modal:true,
  requires: [
   'myapp.view.registrar.Avance'
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
      xtype: 'avance',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
      items: []
    }]
  }
});