Ext.define('myapp.view.actividad.WinAsignarEjecutorAPlan', {
extend: 'Ext.window.Window',
  alias: 'widget.winAsignarEjecutorAPlan',
  itemId: 'winAsignarEjecutorAPlan',
  title:'Plan de Accion',
  height: 450,
  width: 490,
  modal:true,
  requires: [
   'myapp.view.actividad.ListaEmpleadoPlan'
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
      xtype: 'listaEmpleadoPlan',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});