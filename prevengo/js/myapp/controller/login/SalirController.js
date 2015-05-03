Ext.define('myapp.controller.login.SalirController',{
  extend: 'Ext.app.Controller',  
  init: function(application) { 
    document.location= BASE_URL+'login/login/logout';
  }
});