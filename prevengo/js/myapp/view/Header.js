Ext.define('myapp.view.Header', { 
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.appheader',
  height: 200,
  baseCls:'price',
  ui: 'footer',
  
  items: [{
    xtype: 'image',                           
    src: BASE_PATH+'imagen/logo/Logo-Nuevo-Gober-sin-borde.png',
    height:80,
    margin: '15  0 0 0',
    width:350,
    },
   
   { 
        xtype: 'tbfill'
    },
    {
        xtype: 'label',
        text: 'PREVENGO',
       margin: '30 0 0 0',
        baseCls:'Three-Dee', 
        height:80,
        width:150,
        x:600,
        y:10
    },
    { 
        xtype: 'tbfill'
    },
     {
        xtype: 'label',
        name:'lblBienvenido',
        text: 'Bienvenido',
         margin: '30 0 0 0',
        baseCls:'Three-Dee', 
        height:80,
        width:150,
        x:600,
        y:10
    },
     { 
        xtype: 'tbfill'
    },
    ] 
});