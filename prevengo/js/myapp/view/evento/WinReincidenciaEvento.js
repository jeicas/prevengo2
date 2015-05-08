Ext.define('myapp.view.evento.WinReincidenciaEvento', {
extend: 'Ext.window.Window',
  alias: 'widget.winReincidenciaEvento',
  itemId: 'winReincidenciaEvento',
  title:'Lineamiento',
  height: 510,
  width: 900,
  modal:true,
  requires: [
   'myapp.view.evento.ListaReincidenciaEvento'
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
      xtype: 'listaReincidenciaEvento',
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




      