Ext.define('myapp.view.maestroNombre.WinMaestroTipoUsuario', {
extend: 'Ext.window.Window',
  alias: 'widget.winMaestroTipoUsuario',
  itemId: 'winMaestroTipoUsuario',
  title:'Evento',
  height: 150,
  width: 330,
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
                         xtype: 'textfield',
                        x: 10,
                        y: 20,
                        width: 300,
                        fieldLabel: 'Nombre:',
                        name:'nombre'
                    }
        ]// fin del contenedor
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: [{
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
          }]
    }]
  }
});