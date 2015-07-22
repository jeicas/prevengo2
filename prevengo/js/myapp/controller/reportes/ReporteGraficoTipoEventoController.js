Ext.define('myapp.controller.reportes.ReporteGraficoTipoEventoController', {
  extend: 'Ext.app.Controller',
  views: [
    'reportes.ReporteGraficoTipoEvento',
   
   
  ],
  requires: [
    'myapp.util.Util' ,
    'myapp.util.Md5' 
  ],
  refs: [{
    ref: 'ReporteGraficoTipoEvento',
    selector: '#reporteGraficoTipoEvento'
  }],
  init: function() {
    this.control();
  },

});