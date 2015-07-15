Ext.define('myapp.view.Header', { 
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.appheader',
  height: 200,
  baseCls:'price',
  ui: 'footer',
  
  items: [  
   { 
        xtype: 'tbfill'
    },
   
    { 
        xtype: 'tbfill'
    },
   { 
        xtype: 'tbfill'
    },
   {
        xtype: 'label',
        name:'lblBienvenido',
        text: '',
         margin: '30 0 0 0',
         baseCls:'usuario',   
    },
    {
        xtype: 'label',
        name:'lblTipoUsuario',
        text: 'tipousuario',
         margin: '10 10 10 10',
         baseCls:'usuario',   
    },
     
     
   
     { 
        xtype: 'tbfill'
    },
    {
    xtype: 'image',                           
    src: BASE_PATH+'imagen/logo/Logo-Nuevo-Gober-sin-borde.png',
    height:80,
    margin: '15  0 0 0',
    width:350,
    },
    ] 
});