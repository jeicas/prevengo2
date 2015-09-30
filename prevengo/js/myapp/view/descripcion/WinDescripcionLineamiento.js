Ext.define('myapp.view.descripcion.WinDescripcionLineamiento', {
extend: 'Ext.window.Window',
  alias: 'widget.winDescripcionLineamiento',
  itemId: 'winDescripcionLineamiento',
  title:'Descripción',
  height: 420,
  width: 850,
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
                        name:'lblTitulo'
                    },
                    {
                        xtype: 'textareafield',
                        x: 10,
                        y: 60,
                        width: 800,
                        height: 250,
                        fieldLabel: 'Descripción:',
                        name:'txtDescripcion'
                    }
        ]// fin del contenedor
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: [
          {
            xtype : 'tbfill'
          },
          {
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
           // itemId: 'addAvance', 
            text    : 'Guardar',
            disabled:false,
            //formBind: true,
            scope   : this,


          },
          {
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnLimpiar',
            text    : 'Limpiar'
          }
      ]
    }]
  }
});