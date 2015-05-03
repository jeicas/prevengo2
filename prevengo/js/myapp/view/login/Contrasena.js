Ext.define('myapp.view.login.Contrasena', {
  extend : 'Ext.form.Panel',
  alias: 'widget.contrasena',
  itemId: 'contrasena',
  requires:['Ext.form.*','Ext.tip.QuickTipManager'],
  layout:{
    type : 'vbox',
    align: 'center',
  },
  title : 'Olvide mi contraseña',
  autoShow: true,
  autoRender: true,
  width: 500,
  height: 350,
  initComponent: function() {
    var me   = this;
    me.items = me.buildItems();
    me.callParent(arguments);
  },
  buildItems : function(){
    return [{
      xtype   :'container',
      border: 1,
      layout: {
        align :'center',
        pack  :'center',
        type  :'vbox'
      },
      margin:'20 0 0 0',
      items: [{ 
        xtype: 'container',
        items: [{
            xtype       : 'fieldcontainer',
            fieldLabel  : 'Cédula',
            layout:'hbox',
            items:[{
              xtype       : 'combobox',
              width       : 70,
              hiddenLabel : true,
              name        : 'nacionalidad',
              value       : 'V',
              displayField: 'idnacionalidad',
              store       : Ext.create('myapp.store.persona.nacionalidadStore'),
              valueField  : 'idnacionalidad',
              editable    : false
            },{
              xtype       : 'textfield',
              name        : 'cedula',
              hiddenLabel : true,
              width       : 125,
              vtype       : 'numero',
              maxLength   : 8,
              minLength   : 4,
              allowBlank  : false
            }]
          },{
          xtype       :'textfield',
          width       :300,
          allowBlank  :false,
          name        :'correo',
          vtype       :'correo',
          fieldLabel  : 'E-mail'
        },{
          xtype       : 'textfield',
          fieldLabel  : 'Contraseña',
          width       :300,
          name        :'contrasena',
          inputType   :'password',
          vtype       :'alphanum',
          minLength   : 4,
          allowBlank  : false
        },{
          xtype       : 'textfield',
          fieldLabel  : 'Confirmar',
          width       :300,
          name        :'recontrasena',
          inputType   :'password',
          allowBlank  : false,
          validator: function(value) {
            var txtcontrasena = this.previousSibling('[name=contrasena]');
            return (value === txtcontrasena.getValue()) ? true : 'No coinciden las contraseñas.'
          }
        },{
          xtype       : 'panel',
          border      : false,
          height      : 150,
          width       : 350,
          itemId      : 'reCaptcha',
          items: [recaptcha]
        }]
      }]
    }]
    },
    dockedItems:[{
      xtype   : 'toolbar',
      dock    : 'bottom',
      height  : 40,
      width: '100%',
      items:[{
        xtype : 'tbfill'
      },{
        xtype   : 'button',
        iconCls :'cancel',
        id      :'salir',
        text    : 'Salir'
      },{
        xtype   : 'button',
        iconCls :'save',
        id      :'guardar',
        text    : 'Guardar',
        disabled:true,
        formBind: true,
        scope   : this,
      }]
  }]
});
var recaptcha = Ext.create('myapp.util.ReCaptcha',{
  name: 'recaptcha',
  recaptchaId: 'recaptcha',
  publickey: '6LcJAPUSAAAAACZ_vvBx46SqeL0eSQTh5JhkKcLC',
  theme: 'white',
  lang: 'es'
 });