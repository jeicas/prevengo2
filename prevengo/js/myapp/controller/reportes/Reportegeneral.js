Ext.define('myapp.controller.reportes.Reportegeneral', {
  extend: 'Ext.app.Controller',
  views: [
    'reportes.Reportegeneral',
    'reportes.ListadoGeneral'
  ],
  requires: [
    'myapp.util.Util' ,
    'myapp.util.Md5' 
  ],
  refs: [{
    ref: 'Reportegeneral',
    selector: '#reportegen'
  },{
    ref: 'ListadoGeneral',
    selector: '#listadogeneral'
  },{
    ref: 'PersonalPermiso',
    selector: '#personalpermiso'
  },{
    ref: 'SalidaEmpleados',
    selector: '#salidaempleados'
  }],
  init: function() {
    this.control({
      "#reportegen radiogroup[name=reportes]": {
        change: this.changeReporte
      },
      "#personalpermiso button[name=generarpersonalpermiso]": {
      click: this.onButtonClickgenerarPermiso
      },
      "#personalpermiso button[name=limpiarlpersonalpermiso]": {
      click: this.onButtonClickLimpiargenerarPermiso
      },
      "#listadogeneral button[name=generarlistado]": {
      click: this.generarListadoGeneral
      },
      "#listadogeneral button[name=limpiarlistadogeneral]": {
      click: this.limpiargenerarListadoGeneral
      },
      "#personalpermiso radiogroup[name=rdiofecha]": {
      change: this.changeSeleccionFecha
      },  
      "#salidaempleados button[name=generarsalidaempleados]": {
      click: this.generarsalidaempleados
      },
      "#salidaempleados button[name=limpiarsalidaempleados]": {
      click: this.limpiarsalidaempleados
      },
    });
  },
  generarsalidaempleados: function(button, e, options) {
    var formPanel1 = button.up('window');
    var formPanel = button.up('form');
    nacionalidad= formPanel.down("combobox[name=cmbnacionalidadplanilla]").getValue();
    cedula= formPanel.down("textfield[name=textcedulaplanilla]").getValue();
    nombre= formPanel.down("textfield[name=textnombre]").getValue();
    apellido= formPanel.down("textfield[name=textapellido]").getValue();
    departamento= formPanel.down("combobox[name=departamento]").getValue();
    formPanel1.close();
    window.open(BASE_URL +'pdfs/reportegeneral/generarSalidaEmpleados?nacionalidad='+nacionalidad+'&cedula='+cedula+'&nombre='+nombre+'&apellido='+apellido+'&departamento='+departamento);    
  },
  limpiarsalidaempleados: function(button, e, options){
    var formPanel = button.up('form');
    formPanel.getForm().reset();
  },
  changeSeleccionFecha:function(grupo,cmp){
    if(cmp.rdffecha){
      Ext.ComponentQuery.query("#personalpermiso datefield[name=dia]")[0].setVisible(true);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechades]")[0].setVisible(false);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechahas]")[0].setVisible(false);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechades]")[0].reset();
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechahas]")[0].reset();
    }else{
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechades]")[0].setVisible(true);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechahas]")[0].setVisible(true);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=dia]")[0].setVisible(false);
      Ext.ComponentQuery.query("#personalpermiso datefield[name=dia]")[0].reset();
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechades]")[0].reset();
      Ext.ComponentQuery.query("#personalpermiso datefield[name=cmbfechahas]")[0].reset();
    }
  },
  changeReporte:function(grupo,cmp){
    var formPanel1 = grupo.up('panel');
    var reportes = Ext.ComponentQuery.query("#reportegen [name=reportegen]");
    var  valor=(reportes[0].getGroupValue());
    switch (valor) {
      case '1':
        var win=Ext.create('myapp.view.reportes.PersonalPermiso');
        win.setTitle('Listado de Empleado(s) con autorizaciones de permiso.');
        win.show();
        Ext.ComponentQuery.query("#reportegen radiogroup[name=reportes]")[0].reset();
      break;   
      case '2':
        var win=Ext.create('myapp.view.reportes.ListadoGeneral');
        win.setTitle('Listado de Oficina(s) con autorizaciones de permiso.');
        win.show();
        Ext.ComponentQuery.query("#reportegen radiogroup[name=reportes]")[0].reset();
      break;
      case '3':
        var win=Ext.create('myapp.view.reportes.SalidaEmpleados');
        win.setTitle('Resumen de Autorizaciones por Empleado(s).');
        win.show();
        Ext.ComponentQuery.query("#reportegen radiogroup[name=reportes]")[0].reset();
      break;
    }
  },
   onButtonClickgenerarPermiso: function(button, e, options) {
    var formPanel1 = button.up('window');
    var formPanel = button.up('form');
    fecha=formPanel.down("radiogroup[name=rdiofecha]").getValue();    
    dia= formPanel.down("datefield[name=dia]").getValue();
    desde= formPanel.down("datefield[name=cmbfechades]").getValue();
    hasta= formPanel.down("datefield[name=cmbfechahas]").getValue();
    fechadia=Ext.Date.format(dia, 'Y-m-d');
    fechades=Ext.Date.format(desde, 'Y-m-d');
    fechahas=Ext.Date.format(hasta, 'Y-m-d');
    motivoautorizacion= formPanel.down("combobox[name='cmbmotivo']").getValue();
    tipoautorizacion= formPanel.down("combobox[name='cmbtipoautorizacion']").getValue();  
    formPanel1.close();
    if(fecha['rdffecha']=='1'){
      fechades=fechadia;
      fechahas=fechadia;
      window.open(BASE_URL +'pdfs/reportegeneral/generarPermiso?motivoautorizacion='+motivoautorizacion+'&tipoautorizacion='+tipoautorizacion+'&fechades='+fechades+'&fechahas='+fechahas);
    }else{
      window.open(BASE_URL +'pdfs/reportegeneral/generarPermiso?motivoautorizacion='+motivoautorizacion+'&tipoautorizacion='+tipoautorizacion+'&fechades='+fechades+'&fechahas='+fechahas);
    }    
  },
  onButtonClickLimpiargenerarPermiso: function(button, e, options){
    var formPanel = button.up('form');
    formPanel.getForm().reset();
    fechades= formPanel.down("datefield[name=cmbfechades]").setValue('');
    fechahas= formPanel.down("datefield[name=cmbfechahas]").setValue('');
    motivoautorizacion= formPanel.down("combobox[name='cmbmotivo']").setValue('');
    tipoautorizacion= formPanel.down("combobox[name='cmbtipoautorizacion']").setValue('');

  },
  generarListadoGeneral: function(button, e, options) {
    var formPanel1 = button.up('window');
    var formPanel = button.up('form');
    departamento= formPanel.down("combobox[name='cmbdepartamento']").getValue();
    window.open(BASE_URL +'pdfs/reportegeneral/generarListadoGneral?departamento='+departamento);
    formPanel1.close();
  },
  limpiargenerarListadoGeneral: function(button, e, options){
    var formPanel = button.up('form');
    formPanel.getForm().reset();
    departamento= formPanel.down("textfield[name=cmbdepartamento]").setValue('');
  }
});