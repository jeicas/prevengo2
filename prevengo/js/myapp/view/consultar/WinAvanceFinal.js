Ext.define('myapp.view.consultar.WinAvanceFinal', {
extend: 'Ext.window.Window',
  alias: 'widget.ventanaAvanceFinal',
  itemId: 'ventanaAvanceFinal',
  height: 650,
  width: 800,
  modal:true,
  requires: [
   'myapp.view.consultar.ListaAvanceFinal'
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
      xtype: 'listaAvanceFinal',
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