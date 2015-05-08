Ext.define('myapp.view.avance.WinAsignarUsuario', {
extend: 'Ext.window.Window',
  alias: 'widget.winAsignarUsuario',
  itemId: 'winAsignarUsuario',
  title:'Usuarios',
  height: 510,
  width: 900,
  modal:true,
  requires: [
   'myapp.view.avance.ListaAsignarUsuario'
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
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: [  
      ]
    }]
  }
});




      