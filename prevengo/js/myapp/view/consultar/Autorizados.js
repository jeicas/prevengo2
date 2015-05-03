Ext.define('myapp.view.consultar.Autorizados', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.autorizados',
  requires: [
   'myapp.view.consultar.AutorizadosLista'
  ],
  layout: {
   	type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.callParent();
  },
  buildItem : function(){
    return [{
      xtype: 'autorizadosLista',
    }]
  },
});