Ext.define('myapp.controller.login.Contrasena',{
  extend: 'Ext.app.Controller',
  views: ['login.Contrasena'],
  requires: ['myapp.util.ReCaptcha'],
  refs: [{
    ref: 'contrasena',
    selector: '#contrasena'
  }],
  init: function(application) { 
    this.control({ 
      "#contrasena button#guardar":{
        click: this.guardar
      },
      "#contrasena button#salir":{
        click: this.salirContrasena
      }
    }); 
  },
  guardar: function(button, e, options){
    me=this;
    var formulario=button.up('form'); 
    contra = button.up('contrasena'),  
    console.log(recaptcha.getResponse());
    if(recaptcha.getResponse()!=''){
      nacionalidad=formulario.down('combobox[name=nacionalidad]').getValue();
      cedula=formulario.down('textfield[name=cedula]').getValue();
      pass= formulario.down('textfield[name=contrasena]').getValue();
      contrasena = myapp.util.Md5.encode(pass);
      correo= formulario.down('textfield[name=correo]').getValue();
      Ext.get(contra.getEl()).mask("Verificando... Por favor espere...",'loading');
      Ext.Ajax.request({
        url: BASE_URL + 'login/login/verifica_captcha',
        method:'POST',
        params: {
          nacionalidad: nacionalidad,
          cedula: cedula,
          contrasena: contrasena,
          correo: correo,
          recaptcha_challenge_field: recaptcha.getChallenge(),
          recaptcha_response_field: recaptcha.getResponse()
        } ,
        failure: function(form,action){
          Ext.get(contra.getEl()).unmask();
            Ext.Msg.show({
              title:'Error!',
              msg: form.responseText,
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          },
          success: function(form,action){
            Ext.get(contra.getEl()).unmask();
            datos=Ext.JSON.decode(form.responseText);
            if (datos.success!=false){
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Contraseña actualizada exitosamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                formulario.getForm().reset();
                document.location= BASE_URL+'../';
              }
            else{
              Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Los datos suministrados no son correctos', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
          }
      });     
    }else{
      Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar la imagen del ReCaptcha', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
    }
  },
  salirContrasena: function(){
    document.location= BASE_URL+'../';
  }
});