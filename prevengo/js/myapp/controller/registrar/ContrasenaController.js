Ext.define('myapp.controller.registrar.ContrasenaController', {
  extend: 'Ext.app.Controller',
  views: [
    'registrar.Contrasena'
  ],
  refs:[{
    ref: 'contrasenaForm',
    selector: '#contrasenawindow #contrasenaform'
  }],
  requires: [
    'myapp.util.Util' ,
    'myapp.util.Md5' 
  ],
  init: function() {
    this.control({
      "contrasena  textfield[name=pass]": {
        specialkey: this.onTextfieldSpecialKey1
      },
      "contrasena  textfield": {
        change: this.onActivarBoton
      }, 
      "contrasena toolbar button[name=guardar]":  {       // #1  
        click: this.onButtonClickSubmit // #2 
      }, 
    });
  },
  onActivarBoton : function(button, e, options){
    var win = button.up('window'),
    formPanel = button.up('form');
    if (formPanel.getForm().isValid()) {
      Ext.ComponentQuery.query('contrasena toolbar button[name=guardar]')[0].setDisabled(false);
    }else{
      Ext.ComponentQuery.query('contrasena toolbar button[name=guardar]')[0].setDisabled(true);
    }
  },
   onButtonClickSubmit: function(button, e, options){

    var win = button.up('window');
    formPanel = win.down('form');
    contrasena = button.up('contrasena');    
    pass = formPanel.down('textfield[name=confcontrasena]').getValue();    
    passactual = formPanel.down('textfield[name=contrasenact]').getValue();    
    confcontrasena = myapp.util.Md5.encode(pass);
    actual = myapp.util.Md5.encode(passactual);
    Ext.Ajax.request({ 
      url: BASE_URL + 'registrar/usuario/updatecontrasena',
      method:'POST',
      params: { 
        clave:confcontrasena,
        contrasena:actual
      },
      failure: function(conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true); 
        myapp.util.Util.showbienMsg(result.msg);
      },
      success: function(conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true);         
        myapp.util.Util.showbienMsg(result.msg);
        contrasena.close();
         
      }
    });
  },     
  onTextfieldSpecialKey1: function(field, e, options) {
    var win = field.up('window'),
    formPanel = win.down('form'),
    formPanel1= win.down('toolbar');
    formPanel1.down('button[name=guardar]').enable(true);
  }
});