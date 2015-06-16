Ext.define('myapp.view.observacion.WinObservacionAvanceRechazad', {
extend: 'Ext.window.Window',
  alias: 'widget.winObservacionAvanceRechazad',
  itemId: 'winObservacionAvanceRechazad',
  title:'Observación',
  height: 250,
  width: 390,
  modal:true,
  requires: [
    
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
      xtype: 'container',
            height: 270,
            width: 676,
            layout: 'absolute',
            items: [
                  {
                        xtype: 'label',
                        x: 10,
                        y: 20,
                        width: 400,
                        text:'',
                        name:'lblDescripcion'
                    },
                    {
                        xtype: 'textareafield',
                        x: 10,
                        y: 60,
                        width: 300,
                        fieldLabel: 'Motivo:',
                        name:'txtDescripcion'
                    }
        ]// fin del contenedor
    }]
  },
  buildDockedItems : function(){
    return []
  }
});