Ext.define('myapp.view.login.Login', {
  extend    :'Ext.window.Window',
  alias     :'widget.login',
  resizable :false,
  draggable :false,
  itemId    :'loginWindow',
  autoShow  :true,
  //height    :'35%',
  //width     :'45%',
  height    :350,
  width     :600,
  layout    :'fit',
  iconCls   :'key',
  title     :"Iniciar Sesion",
  closeAction: 'hide',
  closable  :false,
  items: [{
    xtype   :'form',
    frame   :false,
    bodyPadding:15,
    itemId  :'loginForm',
    layout: {
        align :'center',
        pack  :'center',
        type  :'vbox'
      },
    dockedItems: [{
      xtype :'toolbar',
      dock  :'bottom',
      items :[{
        xtype:'tbfill'
      },{ 
        xtype   :'button',
        itemId  :'cancel',
        iconCls :'icon-limpiar',
        text    :'Limpiar'
      },{
        xtype   :'button',
        itemId  :'submit',
        iconCls :'go',
        formBind:true,
        text    :"Aceptar"
      }]
    }],
    items: [{
      xtype: 'image',                           
      src: BASE_PATH+'imagen/logo/Logo-Nuevo-Gober-sin-borde.png',
      height:80,
      width:350,
      margin  :'0 0 20 0',
    },{ 
      xtype: 'container',
      items: [{
        xtype     :'textfield',
        labelWidth:70,
        allowBlank:false,
        name      :'user',
        fieldLabel: "Usuario",
        maxLength : 25
      },{
        xtype     :'textfield',
        labelWidth:70,
        allowBlank:false,
        inputType :'password',
        name      :'password',
        maxLength : 15,
        name      : 'password',
        fieldLabel: "Contraseña",
        enableKeyEvents: true,
        id        : 'password'
      }/*,{
        xtype   :'button',
        itemId  :'contrasena',
        scale   :'small',
        margin  :'0 0 0 100',
        text    :'Olvide mi contraseña'
      }*/]
    }]
  }]
}); 