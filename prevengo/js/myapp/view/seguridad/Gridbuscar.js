Ext.define('myapp.view.seguridad.Gridbuscar', {
extend: 'Ext.window.Window',
  alias: 'widget.gridbuscar',
  itemId: 'gridbuscar',
  height: 360,
  width: 655,
  modal:true,
  requires: [
   'myapp.view.seguridad.Gridbuscaremp'
  ],
  layout: {
   	type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [{
      xtype: 'gridbuscaremp',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
      items: [/*{
        xtype: 'radiogroup',
        width: 280,
        name:'evento',
        margins: '0 0 0 10',
        hiddenLabel:true,
        items: [{
          name:'autorizacion',
          inputValue:1,
          checked:true,
          boxLabel: 'Entrada'
        },{
          name:'autorizacion',
          boxLabel: 'Salida',
          inputValue:2
        }]
      },{
        xtype   : 'button',
        iconCls : 'buscar',        
        margins : '0 0 0 5',
        tooltip :'Evento',
        id      :'buscarEvaluacion',
        name    :'buscarEvaluacion'
      },{
        xtype     : 'datefield',
        width     : 200,
        labelWidth: 50,
        margins   : '0 0 0 20',
        fieldLabel: 'Fecha',
        name      : 'fechaAutorizacion',
        id        : 'fechaAutorizacion',
        allowBlank: false,
        minValue  : new Date()  // limited to the current date or prior
      },{
        xtype     : 'timefield',
        name      : 'horaSalida',
        id        : 'horaSalida',
        labelWidth: 50,
        margins   : '0 0 0 20',
        fieldLabel: 'Salida',
        increment : 30,
        width     : 150,
        allowBlank: false,
        disabled  : true,
        minValue  : '8:00 AM',
        maxValue  : '6:00 PM'
      },{
        xtype     : 'timefield',
        name      : 'horaEntrada',
        id        : 'horaEntrada',
        labelWidth: 50,
        margins   : '0 0 0 20',
        fieldLabel: 'Entrada',
        increment : 30,
        width     : 150,
        disabled  : true,
        allowBlank: false,
        minValue  : '8:00 AM',
        maxValue  : '6:00 PM'
      },{
        xtype   : 'button',
        iconCls :'save',
        id      :'guardarEvento',
        text    : 'Guardar',
        scope   : this,
      }*/]
    }]
  }
});