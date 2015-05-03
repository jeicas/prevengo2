
Ext.define('myapp.view.seguridad.Usuario', { 
  extend: 'Ext.panel.Panel', 
  alias: 'widget.usuario',
  requires: [  
   'myapp.view.seguridad.Usuariolista'
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
      xtype: 'usuariolista',
    }]
  },    
  buildDockedItems : function(){
    return [{
    xtype: 'toolbar', 
    flex: 1, 
    dock: 'top', 
    items: [{ 
        xtype: 'button', 
        text: 'Nuevo', 
        itemId: 'add', 
        iconCls: 'useradd' 
      },{ 
        xtype: 'button', 
        text: 'Editar', 
        itemId: 'edit',
        iconCls: 'useredit'
      }]
    }]   
  }    
}); 
