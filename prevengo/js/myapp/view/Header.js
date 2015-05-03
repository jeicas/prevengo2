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
    width:350,
    },{ 
        xtype: 'tbfill'
    },
   {
     xtype: 'label',                           
    text: 'Bienvenido:',
    height:80,
    width:150,
    x:600,
    y:10
    },
    {
     xtype: 'label',                           
    text: '',
    id:'nombreUsuario',
    height:80,
    width:150,
    x:600,
    y:10
    },
    {
        xtype: 'label',
        text: 'PREVENGO',
        baseCls:'Three-Dee'
    }
    ] 
});