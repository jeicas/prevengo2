Ext.define('myapp.view.evento.WinAsignarComisionado', {
extend: 'Ext.window.Window',
  alias: 'widget.winAsignarComisionado',
  itemId: 'winAsignarComisionado',
  title:'Plan de Accion',
  height: 450,
  width: 490,
  modal:true,
  requires: [
   'myapp.view.evento.ListaAsignarComisionado'
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
      xtype: 'listaAsignarComisionado',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});