Ext.define('myapp.view.evento.WinReincidencia', {
extend: 'Ext.window.Window',
  alias: 'widget.winReincidencia',
  itemId: 'winReincidencia',
  title:'Evento',
  height: 370,
  width: 500,
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
            x:-15,
            y:-20,
            layout: 'absolute',
            items: [ {   
                xtype: 'form',
                fileUpload: true,
                width: 500,
                layout: 'absolute',
                name: 'formReincidencia',
                 id: 'formReincidencia',
                labelWidth: 50,
                defaults: {
                    anchor: '95%',
                    allowBlank: false,
                    msgTarget: 'side'
                },
                items:[
                {
                    xtype: 'label',
                    x: 400,
                    y: 200,
                    disable:true,
                    name:'lblIdEvento',
                    height: 80,
                    text:'',
                    width: 80
                  },
                  {
                    xtype: 'fieldset',
                    x: 30,
                    y: 30,
                    height: 150,
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
                },{
                    xtype: 'fileuploadfield',
                    id: 'btnSubirArchivo',
                    name: 'btnSubirArchivo',
                    x:30,
                    y:220,
                    width: 100,
                    emptyText: 'Seleccione el anexo...',
                    fieldLabel: 'Archivo',
                    buttonText: 'Seleccionar'
                }],
                
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
          },
          {
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
            text    : 'Guardar',
            disabled:false,
            scope   : this,


          },{
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnLimpiar',
            text    : 'Limpiar'
          }]
     
    }]
  }
});

