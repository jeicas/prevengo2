Ext.define('myapp.view.actividad.WinAsignarEjecutorAPlan', {
extend: 'Ext.window.Window',
  alias: 'widget.winPlanEvento',
  itemId: 'winPlanEvento',
  title:'Plan de Accion',
  height: 450,
  width: 850,
  modal:true,
  requires: [
   'myapp.view.actividad.ListaAsignarEjecutorAPlan'
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
      xtype: 'listaAsignarEjecutorAPlan',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});