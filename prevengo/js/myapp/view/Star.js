Ext.Loader.setConfig({
  enabled : true,
  paths : {
    myapp : BASE_PATH+"js/myapp" ,
  }
});
Ext.application({
  name    : "myapp",
  appFolder   : BASE_PATH+"js/myapp",
  controllers : [
    //'myapp.controller.Menu',
    'myapp.controller.login.Login',
    'myapp.controller.login.Contrasena'
  ],
  requires:[
    'myapp.view.login.Login',
    'myapp.view.login.Contrasena',
    'myapp.controller.login.Login',
    'myapp.controller.login.Contrasena',
    'myapp.vtypes.Validadores'

  ]
});
Ext.onReady(function(){
  Ext.create('myapp.vtypes.Validadores').init();
  var MyViewPrincipal = Ext.create("myapp.view.login.Login");
      MyViewPrincipal.show();
});