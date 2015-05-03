Ext.define('myapp.view.actividad.WinPlanEvento', {
extend: 'Ext.window.Window',
  alias: 'widget.winPlanEvento',
  itemId: 'winPlanEvento',
  title:'Plan de Accion',
  height: 450,
  width: 850,
  modal:true,
  requires: [
   'myapp.view.actividad.ListaPlanEvento'
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
      xtype: 'listaPlanEvento',
    }]
  },
  buildDockedItems : function(){
    return []
  }
});