Ext.define('myapp.view.evento.WinReincidencia', {
extend: 'Ext.window.Window',
  alias: 'widget.winReincidencia',
  itemId: 'winReincidencia',
  title:'Evento',
  height: 350,
  width: 690,
  modal:true,
  requires: [
 
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
    return [
    {
            xtype: 'container',
            height: 318,
            width: 581,
            layout: 'absolute',
            items: [
                {
                    xtype: 'fieldset',
                    x: 30,
                    y: 30,
                    height: 170,
                    width: 450,
                    layout: 'absolute',
                    title: 'Datos de la Reincidencia',
                    items: [
                        {
                            xtype: 'textareafield',
                            x: 10,
                            y: 10,
                            height: 62,
                            width: 310,
                            fieldLabel: 'Descripción:',
                            name:'txtDescripcion'
                            
                        },
                        {
                            xtype: 'numberfield',
                            x: 10,
                            y: 90,
                            width: 310,
                            fieldLabel: 'Costo',
                            name:'txtCosto'
                        }
                    ]
                },
                {
                    xtype: 'image',
                    x: 400,
                    y: 220,
                    name:'img',
                    height: 80,
                    width: 80
                },
                {
                    xtype: 'fieldset',
                    x: 30,
                    y: 210,
                    height: 90,
                    width: 360,
                    layout: 'absolute',
                    title: 'Anexo',
                    items: [
                        {
                            xtype: 'filefield',
                            x: 10,
                            y: 20,
                            width: 320,
                            name:'btnSubirArchivo',
                            fieldLabel: 'Subir archivo:'
                        }
                    ]
                }
            ]
        }
    ]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      height  : 40,
          width: '100%',
          items:[{
            xtype : 'tbfill'
          },{
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnLimpiar',
            text    : 'Limpiar'
          },{
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
           // itemId: 'addAvance', 
            text    : 'Guardar',
            disabled:false,
            //formBind: true,
            scope   : this,


          }]
     
    }]
  }
});