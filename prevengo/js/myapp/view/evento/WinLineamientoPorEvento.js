Ext.define('myapp.view.evento.WinLineamientoPorEvento', {
extend: 'Ext.window.Window',
  alias: 'widget.winLineamientoPorEvento',
  itemId: 'winLineamientoPorEvento',
  title:'Lineamiento',
  height: 510,
  width: 900,
  modal:true,
  requires: [
   'myapp.view.evento.ListaLineamientoPorEvento'
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
      xtype: 'listaLineamientoPorEvento',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: [  
      ]
    }]
  }
});




      