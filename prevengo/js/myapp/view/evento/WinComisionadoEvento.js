Ext.define('myapp.view.evento.WinComisionadoEvento', {
extend: 'Ext.window.Window',
  alias: 'widget.winComisionadoEvento',
  itemId: 'winComisionadoEvento',
  title:'Plan de Accion',
  height: 450,
  width: 490,
  modal:true,
  requires: [
   'myapp.view.evento.ListaComisionadoEvento'
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
      xtype: 'listaComisionadoEvento',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});