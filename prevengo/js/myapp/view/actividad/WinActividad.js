Ext.define('myapp.view.actividad.WinActividad', {
extend: 'Ext.window.Window',
  alias: 'widget.winActividad',
  itemId: 'winActividad',
  title:'Actividad',
  height: 350,
  width: 550,
  modal:true,
  requires: [
   'myapp.view.actividad.ActividadForm'
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
      xtype: 'actividadForm',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: []
    }]
  }
});