Ext.define('myapp.view.evento.WinEvento', {
extend: 'Ext.window.Window',
  alias: 'widget.winEvento',
  itemId: 'winEvento',
  title:'Evento',
  height: 350,
  width: 690,
  modal:true,
  requires: [
    'myapp.view.evento.Evento'
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
      xtype: 'evento',
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