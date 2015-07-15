Ext.define('myapp.controller.reportes.ReporteFechas', {
  extend: 'Ext.app.Controller',
  views: [
    'reportes.ReporteFechas',
   
  ],
  requires: [
    'myapp.util.Util' ,
    'myapp.util.Md5' 
  ],
  refs: [{
    ref: 'ReporteFechas',
    selector: '#reporteFechas'
  }],
  init: function() {
    this.control();
  },

});