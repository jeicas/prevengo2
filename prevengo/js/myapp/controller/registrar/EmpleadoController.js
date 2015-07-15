Ext.define('myapp.controller.registrar.EmpleadoController', {
    extend: 'Ext.app.Controller',
    views: ['registrar.Empleado'],
    requires: [
        'myapp.util.Util'
    ],
    refs: [{
        ref: 'Empleado',
        selector: '#empleado'
    },{
        ref: 'userPicture',
        selector: 'empleado image'
    },{
        ref: 'GridbuscarEmpleado',
        selector: 'gridbuscarempleado'
    },{
        ref: 'Gridbuscaremplistado',
        selector: 'gridbuscaremplistado'
    }],
    
    init: function(application){
        this.control({
            "#empleado  button[name=btncatalogoempleado]":{
                click: this.onButtonClickbuscarEmpleado
            },
            "#empleado  button[name=btnbuscarempleado]":{
                click: this.buscarempleado
            },
            "#empleado  textfield[name=txtcedulaempleado]":{
                change: this.activarboton,
                specialkey: this.onKey 
            },
            "#empleado button[name=guardar]":{
                click: this.guardarEmpleado
            },
            "#empleado datefield[name=fechanacimiento]":{
                change: this.cambiarEdad
            },
            "#empleado radiogroup[name=rdselfoto]": {
                change: this.changeFoto
            },
            "#empleado filefield": {
                change: this.onFilefieldChange
            },
            "#empleado combobox[name=cmbestado]": {
                select: this.selectestado
            },
            "#empleado combobox[name=cmbmunicipio]": {
                select: this.selectmunicipio
            },
           
            "#empleado combobox[name=codTlf2]": {
                select: this.selecttelefonofijo
            },
            "#empleado combobox[name=codTlf1]": {
                select: this.selecttelefonocelular
            },
            "#empleado button[name=limpiar]":{
                click: this.limpiarEmpleado
            },
            "#empleado button#salir":{
                click: this.salirEmpleado
            },
            "#empleado button[action=configurarCamara]":{
                click : this.configurarCamara
            },
            "#empleado combobox[name=cmbtiponomina]":{
                select : this.changeCargo
            },
            "#gridbuscaremplistado button[name=agregarempleado]":{
                click : this.onButtonClickagregarEmpleados
            }
        


        });
    },
    onButtonClickbuscarEmpleado:function (button, e, options) {
        var win=Ext.create('myapp.view.registrar.GridbuscarEmpleado');
        win.show();
    },
    changeCargo:function(grupo,cmp){
    var formPanel = this.getEmpleado();
        tiponomina = formPanel.down("combobox[name=cmbtiponomina]").getValue();
        if(tiponomina==3){
            formPanel.down("combobox[name=cmbcargo]").setDisabled(true);
            formPanel.down("combobox[name=cmbcargo]").setVisible(false);
        }else{
            formPanel.down("combobox[name=cmbcargo]").setDisabled(false);
            formPanel.down("combobox[name=cmbcargo]").setVisible(true);
            formPanel.down("combobox[name=cmbcargo]").reset();
        }
    },
    activarboton: function (form,cmp){
        if(form.isValid()){
            Ext.ComponentQuery.query('#empleado button[name=btnbuscarempleado]')[0].setDisabled(false);
            Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setDisabled(true);
        }
    },
    onButtonClickagregarEmpleados: function (button, e, options) {
        var grid = this.getGridbuscaremplistado();
        var win=this.getGridbuscarEmpleado();
        record = grid.getSelectionModel().getSelection();
        
        if(record[0]){
            if(record.length==1){
 
                Ext.ComponentQuery.query('#empleado')[0].getForm().reset();
                Ext.ComponentQuery.query('#empleado')[0].loadRecord(record[0]);
                grid.close();
                win.close();
                if (record[0].get('foto')) {
                  var img =  Ext.ComponentQuery.query('#empleado image[name=fotoFrontal1]')[0];
                  img.setSrc(BASE_PATH+'./empleados/_DSC' + record[0].get('foto'));
                }
                if(record[0].get('foto')!= '' ){
                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(true);
                     // Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(true);
                    //Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(false);

                }else{

                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(false);
                }
                if(record[0].get('foto') == '0'){
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(true);
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(false);

                }else{
                   // Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(true);
                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(false);
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(true);
                }
                if (record[0].get('codTlf1')==0){
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
                }else{
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(false);
                }
                if (record[0].get('local')==false){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }
                if (record[0].get('movil')==false){
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
                }
                if (record[0].get('sexo')==0){
                    Ext.ComponentQuery.query('#empleado combobox[name=sexo]')[0].reset();
                }
                if (record[0].get('codTlf2')==0){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }else{
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(false);
                }
                if (record[0].get('codTlf2')=='Ninguno'){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }else{
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(false);
                }
                if (record[0].get('fechanacimiento')==""){
                    Ext.ComponentQuery.query('#empleado #edad')[0].setText('');
                }
                Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(false);   
                
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setReadOnly(true);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  textfield[name=txtcedulaempleado]')[0].setValue(record[0].get('cedula'));
                Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(false);
               
                
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
                msg: 'Para este tipo de edición solo se puede seleccionar un empleado', 
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar por lo menos un empleado',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    changeFoto:function(grupo,cmp){
    var form = this.getEmpleado();
        if(cmp.seleccionfoto==1){
          Ext.ComponentQuery.query('#empleado #fotografia')[0].setVisible(true);
          Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(false);
          Ext.ComponentQuery.query('#empleado #fotografia')[0].setDisabled(false);
          Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(false);
          Ext.ComponentQuery.query('#empleado  #fotografia')[0].update('<center><embed id="webcam_movie" src="'+BASE_PATH+'js/plugins/JPEGCam/webcam.swf" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="300" height="250" name="webcam_movie" align="middle" wmode="opaque" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="shutter_enabled=1&shutter_url='+BASE_PATH+'js/plugins/JPEGCam/shutter.mp3&width=300&height=250&server_width=300&server_height=250" /></center>');
        }
        if(cmp.seleccionfoto==2){     
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].allowBlank = false;
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].validateValue(Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].getValue());
            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(false);
            form3=Ext.ComponentQuery.query('#empleado #fotografia')[0];
            form3.getForm().reset();
            form4=Ext.ComponentQuery.query('#empleado #fotografia')[0];
            form4.getForm().reset();
            Ext.ComponentQuery.query('#empleado #fotografia')[0].setVisible(false);
            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(true);
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].reset();
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(true);
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(false);
            form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
        }
        if(cmp.seleccionfoto==3){
            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(true);
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(false);
            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(false);
            form2=Ext.ComponentQuery.query('#empleado #fotografia')[0];
            form2.getForm().reset()
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].allowBlank = true;
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].validateValue(Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].getValue());   
            Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setDisabled(false);
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].reset();
            Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(false);
        }
    },
    configurarCamara : function(panel){
        if (!panel) panel = "camera";
        var movie = document.getElementById('webcam_movie');
        movie._configure("camera");
    },
    tomarFoto:function(){
    var movie = document.getElementById('webcam_movie');
        if (!movie){ 
            alert("ERROR: Cannot locate movie 'webcam_movie' in DOM");
        }    
        movie._snap(BASE_PATH+'index.php/registrar/empleado/guardarFoto?nacionalidad='+ Ext.ComponentQuery.query('#empleado combobox[name=cmbnacionalidad]')[0].getValue()+'&cedula='+Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].value, 90, 1, 0);    
    },
    onKey: function (field, el) {
        var form=this.getEmpleado();
        if (field.isValid()){
            if(el.getKey() == Ext.EventObject.ENTER){
                this.buscarempleado();
            }
        }
    },
    buscarempleado: function (options){
    me=this;
    var form = this.getEmpleado();
    cedula=Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].getValue();
    nacionalidad=Ext.ComponentQuery.query('#empleado combobox[name=cmbnacionalidad]')[0].getValue();
    buscarEmpleado=Ext.create('myapp.store.empleado.EmpleadoStore');
    buscarEmpleado.proxy.extraParams.cedula=cedula;
    buscarEmpleado.proxy.extraParams.nacionalidad=nacionalidad; 
    buscarEmpleado.load(function(records,operation,success){
        if(buscarEmpleado.count()>0){
            buscarEmpleado.each(function (record){// each me busca en la funcion
                form.getForm().loadRecord(record);
                if(record.get('foto') != '0'){
                    form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'./empleados/_DSC'+record.get('foto'));
                }else{
                    form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                }
                if(record.get('foto') != ''){
                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(true);
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(true);
                    Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(false);
                }else{
                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(false);
                }
                if(record.get('foto') == '0'){
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setVisible(true);
                    Ext.ComponentQuery.query('#empleado filefield[name=foto]')[0].setDisabled(false);
                }else{
                    Ext.ComponentQuery.query('#empleado radiogroup[name=rdselfoto]')[0].setDisabled(true);
                }
                me=this;
                me.cambiarEdad;
                if (record.get('fechanacimiento')==""){
                    Ext.ComponentQuery.query('#empleado #edad')[0].setText('');
                }
                if (record.data.local==""){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }
                if (record.data.codTlf1==0){
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
                }else{
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(false);
                }
                if (record.data.local==false){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }else{
                      Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(false);
                }
                if (record.data.movil==false){
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
                }
                if (record.data.sexo==0){
                    Ext.ComponentQuery.query('#empleado combobox[name=sexo]')[0].reset();
                }
                if (record.data.codTlf2==0){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }
                if (record.data.codTlf2=='Ninguno'){
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
                    Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
                }
                if (record.data.cmbdepartamento=="99" && record.data.status==0 && record.data.cmbdepartamento==record.data.departamentoUsuario ){
                    Ext.Msg.alert('Información.', 'Este empleado fue desabilitado,<br> si desea activarlo debe informar a la '+ record.data.nombredepartamento, function(btn){
                          if (btn == 'ok'){
                              me=this;
                              me.cambiarEdad;
                              Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].focus(true,10);
                              var formdos=Ext.ComponentQuery.query('#empleado #datosPersonalesdos')[0];
                              formdos.getForm().reset();
                              form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                              Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(false);
                          }
                            Ext.ComponentQuery.query('#empleado #fotografia')[0].setDisabled(true); 
                            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(true); 
                            Ext.ComponentQuery.query('#empleado #fotografia')[0].setVisible(false);

                            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(true);     
                            Ext.ComponentQuery.query('#empleado  #fotofilset')[0].setDisabled(true);
                            form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                            Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setText('Guardar');
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].reset(); 
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(false);
                            Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setVisible(false);   
                            Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(true);
                    });
                   // Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Este empleado fue desabilitado por algun departamento,<br> si desea activarlo debe informar a la Oficina de Personal', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                    Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(true);
               
                }else{
                    
                    if (record.data.cmbdepartamento!=record.data.departamentoUsuario){
                        Ext.Msg.alert('Información.', 'Este empleado pertenece a la dependencia '+record.data.nombredepartamento+',<br> si desea agregarlo el estatus debe estar inactivo', function(btn){
                        if (btn == 'ok'){
                              me=this;
                              me.cambiarEdad;
                              Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].focus(true,10);
                              var formdos=Ext.ComponentQuery.query('#empleado #datosPersonalesdos')[0];
                              formdos.getForm().reset();
                              form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                              Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(false);
                          }
                            Ext.ComponentQuery.query('#empleado #fotografia')[0].setDisabled(true); 
                            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(true); 
                            Ext.ComponentQuery.query('#empleado #fotografia')[0].setVisible(false);
                            Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(true);     
                            Ext.ComponentQuery.query('#empleado  #fotofilset')[0].setDisabled(true);
                            form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                            Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setText('Guardar');
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].reset(); 
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(false);
                            Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setVisible(false);   
                            Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(true);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].reset();
                            Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(true);
                    });
                    }else{
                        Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(false);
                    }
                    if (record.data.cmbdepartamento!=record.data.departamentoUsuario && record.data.status==0 && record.data.cmbdepartamento=="99"){
                        Ext.Msg.alert('Información.', 'Este empleado pertenece a otro departamento y se encuentra Inactivo,<br> cambiar el estatus para asignar a su dependencia', function(btn){
                            if (btn == 'ok'){
                            Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].focus(true,10);
                            Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(false);
                            Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(false);
                            }
                        });
                    }
                }
                Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(true);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setDisabled(true);
                Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setVisible(true);
                Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(false);
                Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(false);
               // Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
            })
        }else{
            Ext.Msg.alert('Eres Nuevo Usuario!!!', 'Debes verificar todos los datos del formulario para habilitar el boton guardar.', function(btn){
              if (btn == 'ok'){
                  me=this;
                  me.cambiarEdad;
                  Ext.ComponentQuery.query('#empleado textfield[name=nombres]')[0].focus(true,45);
                  var formdos=Ext.ComponentQuery.query('#empleado #datosPersonalesdos')[0];
                  formdos.getForm().reset();
                  form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
                    Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(false);
                  //Ext.ComponentQuery.query('#empleado  #fotografia')[0].update('<center><embed id="webcam_movie" src="'+BASE_PATH+'js/plugins/JPEGCam/webcam.swf" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="300" height="250" name="webcam_movie" align="middle" wmode="opaque" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="shutter_enabled=1&shutter_url='+BASE_PATH+'js/plugins/JPEGCam/shutter.mp3&width=300&height=250&server_width=300&server_height=250" /></center>');
              }
              Ext.ComponentQuery.query('#empleado #edad')[0].setText('');
              Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].reset();
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].reset();
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].reset();
              Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setVisible(true);
              Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].reset();
              Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(false); 
              Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].reset();
              Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setVisible(false);
              Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  #fotofilset')[0].setDisabled(false);
              Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(false);
            });
          }
        });
    },
    limpiarEmpleado : function(form){
    var form=this.getEmpleado();
        form.getForm().reset();
        Ext.ComponentQuery.query('#empleado #edad')[0].setText('');
        Ext.ComponentQuery.query('#empleado  button[name=guardar]')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado #fotografia')[0].setDisabled(true); 
        Ext.ComponentQuery.query('#empleado #fotografia1')[0].setDisabled(true); 
        Ext.ComponentQuery.query('#empleado #fotografia')[0].setVisible(false);
        Ext.ComponentQuery.query('#empleado #fotografia1')[0].setVisible(true);     
        Ext.ComponentQuery.query('#empleado  #fotofilset')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado textfield[name=txtcedulaempleado]')[0].focus(true,10);
        form.down('image[name=fotoFrontal1]').setSrc(BASE_PATH+'imagen/foto/silueta.png');
        Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setText('Guardar');
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].reset(); 
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbdepartamento]')[0].setVisible(false);
        Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].reset();
        Ext.ComponentQuery.query('#empleado  combobox[name=status]')[0].setVisible(false);   
        Ext.ComponentQuery.query('#empleado  #datosPersonales')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado  #filsetnivelocupacional')[0].setDisabled(true);
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbtiponomina]')[0].reset();
        Ext.ComponentQuery.query('#empleado  combobox[name=cmbcargo]')[0].reset();
        Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].reset();
    },
    buscarEmpleadoSpecial: function(field,e,options) {
    me=this;
        if (e.getKey() == e.ENTER || e.getKey() == e.TAB){
            me.buscarempleado();
        }
    },
    guardarEmpleado: function(button, e ,options){
    me=this;
    formulario=this.getEmpleado();
    grid = this.getGridbuscaremplistado();
        if (Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].getValue()== ''&& Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].getValue()== ''){
            Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
            Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
            Ext.MessageBox.show({ title: 'Verifique los datos', msg: 'Debe completar sus datos e introducir al menos un teléfono.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
        }else{
            if(formulario.getForm().isValid()){
                if(formulario.down('radiofield[name=seleccionfoto]').getGroupValue()=='1'){
                this.tomarFoto();
                }       
                var loadingMask = new Ext.LoadMask(Ext.getBody(), { msg: "grabando..." });
                loadingMask.show();
                formulario.getForm().submit({ //AQUI ENVIO LA DATA 
                    url: BASE_URL+'registrar/empleado/guardarEmpleado',
                    method:'POST',
                    params:formulario.getForm().getValues(),
                    success: function(form, action){
                        var result = action.result;           
                        loadingMask.hide();
                        var foto=result.foto;
                        Ext.ComponentQuery.query('#empleado button[name=guardar]')[0].setText('Guardar');
                        // grid.getView().refresh(true);
                        // grid.getStore().load();
                        if (result.success){
                            myapp.util.Util.showbienMsg(result.msg); 
                            Ext.ComponentQuery.query('#empleado  radiogroup[name=rdselfoto]')[0].reset();
                            form2=Ext.ComponentQuery.query('#empleado #fotografia')[0];
                            Ext.ComponentQuery.query('#empleado  #fotografia')[0].update('<center><embed id="webcam_movie" src="'+BASE_PATH+'imagen/foto/silueta.png" /></center>');
                            form2.getForm().reset()
                            form3=Ext.ComponentQuery.query('#empleado #fotografia1')[0];
                            Ext.ComponentQuery.query('#empleado  #fotografia1')[0].update('<center><embed id="webcam_movie" src="'+BASE_PATH+'imagen/foto/silueta.png" /></center>');
                            form3.getForm().reset()
                            me.limpiarEmpleado();
                        }else{
                            me.limpiarEmpleado();
                            myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure : function(form,action){
                    loadingMask.hide();
                        switch (action.failureType){
                        case 
                            Ext.form.Action.CLIENT_INVALID:Ext.MessageBox.show({ title: 'Verifique los datos', msg: 'Algunos campos no fueron introducidos correctamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                        break;
                        case 
                            Ext.form.Action.CONNECT_FAILURE:Ext.MessageBox.show({ title: 'Error', msg: 'Error en comunicaci&oacute;n Ajax', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                        break;
                        case 
                            Ext.form.Action.SERVER_INVALID:Ext.MessageBox.show({ title: 'Error---Verifique!', msg: 'Informacion ingresada es invalida/Servidor invalido', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                        break;
                        default:
                            Ext.MessageBox.show({ title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }
                    }
                });
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar los datos solicitados', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }
    },
    onFilefieldChange: function(filefield, value, options) {
    var file = filefield.fileInputEl.dom.files[0];
    var picture = this.getUserPicture();
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
          var reader = new FileReader();
          reader.onload = function(e){
              picture.setSrc(e.target.result);
          };
          reader.readAsDataURL(file);
        }else if (!(/image/i).test(file.type)){
          Ext.Msg.alert('Información', 'Solo se permiten adjuntar imagenes');
          filefield.reset();
        }   
    },
///////////////Cambiar combo telefono
    selecttelefonofijo: function (cmb, record, index){
        if(cmb.getValue()=='Ninguno'){
            Ext.ComponentQuery.query('#empleado combobox[name=codTlf2]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(true);
        }else{
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(false);
        }
    },
    selecttelefonocelular: function (cmb, record, index){
        if(cmb.getValue()=='Ninguno'){
            Ext.ComponentQuery.query('#empleado combobox[name=codTlf1]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(true);
        }else{
            Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=movil]')[0].setDisabled(false);
        }
    },
//COMBOS ANIDADOS ESTADO, MUNICIPIO PARROQUIA
    selectestado: function (cmb, record, index){
        if(cmb.getValue()!=''){

            municipioStore = Ext.ComponentQuery.query("combobox[name=cmbmunicipio]")[0].getStore();
            Ext.ComponentQuery.query("combobox[name=cmbmunicipio]")[0].clearValue();
            Ext.ComponentQuery.query("combobox[name=cmbmunicipio]")[0].setDisabled(1);
            Ext.ComponentQuery.query("combobox[name=cmbmunicipio]")[0].reset();
            // Ext.ComponentQuery.query('#empleado textfield[name=municipio]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=cmbmunicipio]')[0].setDisabled(false);
            //municipioStore.proxy.extraParams.estado=Ext.ComponentQuery.query("combobox[name=estado]")[0].getValue();
            municipioStore.proxy.extraParams={'estado':Ext.ComponentQuery.query("combobox[name=cmbestado]")[0].getValue()};
            municipioStore.load();
        }else{
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].reset();
            Ext.ComponentQuery.query('#empleado textfield[name=local]')[0].setDisabled(false);
        }
    },
    selectmunicipio: function (cmb, record, index){
            parroquiaStore = Ext.ComponentQuery.query("combobox[name=cmbparroquia]")[0].getStore();
            Ext.ComponentQuery.query("combobox[name=cmbparroquia]")[0].clearValue();
            Ext.ComponentQuery.query("combobox[name=cmbparroquia]")[0].setDisabled(1);
            Ext.ComponentQuery.query("combobox[name=cmbparroquia]")[0].reset();
             Ext.ComponentQuery.query('#empleado textfield[name=cmbparroquia]')[0].setDisabled(false);
            parroquiaStore.proxy.extraParams={'municipio':Ext.ComponentQuery.query("combobox[name=cmbmunicipio]")[0].getValue()};
            parroquiaStore.load();
      
    },


 
/////////////////Cambiar edad
    cambiarEdad: function(){
        me=this;
        form=this.getEmpleado();
        var fechanacimiento=form.down('datefield[name=fechanacimiento]').getValue();
        ano=Ext.Date.format(fechanacimiento, 'Y');
        mes=Ext.Date.format(fechanacimiento, 'm');
        dia=Ext.Date.format(fechanacimiento, 'd');
        numero=me.displayage(ano,mes,dia, "years", 0, "rounddown");
        form.down('#edad').setText('Edad:   ' +numero+ ' años.');
    },
    ////////////Calcular edad
    displayage: function(yr, mon, day, unit, decimal, round) {
        var one_day = 1000 * 60 * 60 * 24;
        var one_month = 1000 * 60 * 60 * 24 * 30;
        var one_year = 1000 * 60 * 60 * 24 * 30 * 12;
        today = new Date();
        var pastdate = new Date(yr, mon - 1, day);

        var countunit = unit;
        var decimals = decimal;
        var rounding = round;

        finalunit = (countunit == "days") ? one_day : (countunit == "months") ? one_month : one_year;
        decimals = (decimals <= 0) ? 1 : decimals * 10;

        if (unit != "years") {
            if (rounding == "rounddown") {
                return (Math.floor((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals);
            }else{
                return (Math.ceil((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals);
            }
        }else{
            yearspast = today.getFullYear() - yr - 1;
            tail = (today.getMonth() > mon - 1 || today.getMonth() == mon - 1 && today.getDate() >= day) ? 1 : 0;
            pastdate.setFullYear(today.getFullYear());
            pastdate2 = new Date(today.getFullYear() - 1, mon - 1, day);
            tail = (tail == 1) ? tail + Math.floor((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals : Math.floor((today.getTime() - pastdate2.getTime()) / (finalunit) * decimals) / decimals;
            return (yearspast + tail);
        }
    },
});