Ext.define('myapp.view.observacion.Observacion', {
  extend: 'Ext.form.Panel',
  alias: 'widget.observacion',
  requires:['Ext.form.*'],
    
  layout: {
    type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.callParent();
  },
  buildItem : function(){
    return [{
            xtype: 'container',
            height: 270,
            width: 676,
            layout: 'absolute',
            items: [
                  {
                        xtype: 'label',
                        x: 10,
                        y: 20,
                        width: 400,
                        text:'Por favor indique la razón por la cual se cancela el Evento:',
                        name:'txtDescripcion'
                    },
                    {
                        xtype: 'textareafield',
                        x: 10,
                        y: 60,
                        width: 300,
                        fieldLabel: 'Descripción:',
                        name:'txtDescripcion'
                    }
        ]// fin del contenedor
    }]// el del Return
  },
     dockedItems:[{ 
       xtype   : 'toolbar',
          dock    : 'bottom',
          height  : 40,
          width: '100%',
          items:[{
            xtype : 'tbfill'
          },
          {
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
           // itemId: 'addAvance', 
            text    : 'Guardar',
            disabled:false,
            //formBind: true,
            scope   : this,


          },
          {
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnLimpiar',
            text    : 'Limpiar'
          }]
      }]
     
});