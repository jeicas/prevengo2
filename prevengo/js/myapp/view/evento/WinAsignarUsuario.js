Ext.define('myapp.view.evento.WinAsignarUsuario', {
extend: 'Ext.window.Window',
  alias: 'widget.winAsignarUsuario',
  itemId: 'winAsignarUsuario',
  title:'Plan de Accion',
  height: 550,
  width: 750,
  modal:true,
  requires: [
   'myapp.view.evento.ListaAsignarUsuario'
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
      xtype: 'listaAsignarUsuario',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});