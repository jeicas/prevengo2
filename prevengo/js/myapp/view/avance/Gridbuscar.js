Ext.define('myapp.view.avance.Gridbuscar', {
extend: 'Ext.window.Window',
  alias: 'widget.gridbuscar',
  itemId: 'gridbuscar',
  title:'Avance',
  height: 410,
  width: 490,
  modal:true,
  requires: [
   'myapp.view.avance.Avance'
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
      dock  : 'bottom',
      items: []
    }]
  }
});