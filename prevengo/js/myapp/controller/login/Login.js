Ext.define('myapp.controller.login.Login',{
  extend: 'Ext.app.Controller',
  views: ['login.Login', 'autenticar.Capslocktooltip','Header'],
  requires: ['myapp.util.Util', 'myapp.util.Md5', 'myapp.util.ReCaptcha'],
  refs: [{
    ref: 'registrarAspirante',
    selector: '#registrarAspirante'
  }],
  refs: [{
    ref: 'login',
    selector: '#loginWindow #loginForm'
  }],
  refs: [{
    ref: 'capslockTooltip',
    selector: 'capslocktooltip'
  }],
  init: function(application) { 
    this.control({
      "login form textfield":{
        specialkey: this.onTextfieldSpecialKey
      },   
      "login form button#submit":{
        click: this.onButtonClickSubmit
      },   
      "login form button#cancel":{
        click: this.onButtonClickCancel
      },
      "login form button#registrate":{
        click: this.onButtonClickRegistrate
      },
      "login form textfield[name=password]":{
      keypress: this.onTextfieldKeyPress
      },
      "login form button#contrasena":{
        click: this.onButtonClickContrasena
      },
      "appheader button#logout": {  
       click: this.onButtonClickLogout
     },
    }); 
  },
  onButtonClickLogout: function(button, e, options) {
   document.location= BASE_URL+'login/login/logout';
 },
  onTextfieldSpecialKey: function(field, e, options) {
    if (e.getKey() == e.ENTER){
      var submitBtn = field.up('form').down('button#submit');
      submitBtn.fireEvent('click', submitBtn, e, options);
    }
  },
  onButtonClickRegistrate: function(button, e, options){ 
    var formPanel = button.up('form'); 
    login = button.up('login');
    login.close();
    var win=Ext.create('myapp.view.registrar.RegistrarAspirante');
    win.show();
  },
  onButtonClickContrasena: function(button, e, options){ 
    var formPanel = button.up('form'); 
    login = button.up('login');
    login.close();
    var win=Ext.create('myapp.view.login.Contrasena');
    win.show();
  },
  onButtonClickSubmit: function(button, e, options){ 
    var formPanel = button.up('form'), 
    login = button.up('login'),  
    url= BASE_URL + 'login/login/auth' 
    user = formPanel.down('textfield[name=user]').getValue(),
    pass = formPanel.down('textfield[name=password]').getValue();
    if (formPanel.getForm().isValid()) {
      pass = myapp.util.Md5.encode(pass);
      Ext.get(login.getEl()).mask("Autentificando... Por favor espere...",'loading');
      Ext.Ajax.request({
        url: BASE_URL + 'login/login/auth',
        method:'POST',
        params: {
          user: user,
          pass: pass
        },
        failure: function(conn, response, options, eOpts) {
          Ext.get(login.getEl()).unmask();
          Ext.Msg.show({
            title:'Fallo!',
            msg: result.msg,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
      },
        success: function(conn, response, options, eOpts) {
          Ext.get(login.getEl()).unmask();
          var result = Ext.JSON.decode(conn.responseText, true); 
          if (result.success) {
            login.close();
              document.location = BASE_URL+'app/home';
          }else {
            Ext.Msg.show({
              title:'Fallo!',
              msg: result.msg, 
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          }
        },
      });
    }
  },
  onButtonClickCancel: function(button, e, options){ 
    button.up('form').getForm().reset();
  },
  onTextfieldKeyPress: function(field, e, options) {
    var charCode = e.getCharCode();
    if((e.shiftKey && charCode >= 97 && charCode <= 122) || 
    (!e.shiftKey && charCode >= 65 && charCode <= 90)){
      if(this.getCapslockTooltip() === undefined){ 
        Ext.widget('capslocktooltip');
      }
        this.getCapslockTooltip().show(); 
      } else {
        if(this.getCapslockTooltip() !== undefined){
          this.getCapslockTooltip().hide();
      }
    }
  }
});