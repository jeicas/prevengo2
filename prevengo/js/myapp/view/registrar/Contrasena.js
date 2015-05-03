Ext.define('myapp.view.registrar.Contrasena', {
   extend: 'Ext.window.Window',
   alias: 'widget.contrasena',
   itemId: 'contrasenawindow',
   autoShow: true,
   height: 230,
   width: 400,
   modal:true,
   resizable:false,
   draggable:false,
   title: 'Cambio de password',
   layout: {
       type: 'fit'
   },
   requires:[
       'myapp.vtypes.Validadores'
   ],
   //store: Ext.create('myapp.store.session.Traersession'),
   initComponent: function() {
   var me = this;
   me.items = me.buildItem();
   me.dockedItems = me.buildDockedItems();
   me.callParent();
   },
   buildItem : function(){
       return [{   
           xtype: 'form',
           itemId: '#contrasenaform',
           width   : '100%',
           bodyPadding: 30,
           items: [{
               xtype: 'container',
               width   : '100%',
               layout: 'vbox',
               items: [{
                   xtype: 'textfield',
                   inputType: 'password',
                   name: 'contrasenact',
                   labelWidth: 140,
                   fieldLabel: 'Contraseña actual',
                   msgTarget: 'side',
                   allowBlank: false,
                   width: '100%',
                   vtype: 'alphanum'
               },{
                   xtype: 'textfield',
                   inputType: 'password',
                   labelWidth: 140,
                   name: 'pass',
                   id:'pass',
                   fieldLabel: 'Nueva Contrasena',
                   msgTarget: 'side',
                   allowBlank: false,
                   vtype: 'alphanum',
                   width: '100%',
                   //disabled:true,
                   minLength:6,
                   maxLength:8,
               },{
                   xtype: 'textfield',
                   inputType: 'password',
                   labelWidth: 140,
                   name: 'confcontrasena',
                   fieldLabel: 'Confirmar nueva Contraseña',
                   msgTarget: 'side',
                   allowBlank: false,
                   width: '100%',
                   //disabled:true,
                   vtype:'password',
                   initialPassField:'pass', 
                   minLength:6,
                   maxLength:8,
               }]
           }]
       }]
   },
   buildDockedItems : function(){
       return [{
           xtype: 'toolbar',
           dock: 'bottom',
           ui: 'footer',
           items: [{
               xtype: 'tbfill'
               },{
               xtype: 'button',
               itemId: 'guardar',
               name:'guardar',
               iconCls: 'go',        
               //formBind: true,
               text: "Guardar",
               disabled:true
           }]
       }];
   }
}); 