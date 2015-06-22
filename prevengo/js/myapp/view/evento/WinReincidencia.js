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
            items: [ 
             //===================================================================
                 {
                    xtype: 'fieldset',
                    x: 30,
                    y: 30,
                    height: 170,
                    width: 370,
                    layout: 'absolute',
                    title: 'Datos de la Reincidencia',
                    items: [
                        {
                            xtype: 'textareafield',
                            x: 10,
                            y: 10,
                            height: 62,
                            width: 320,
                            name:'txtDescripcion',
                            fieldLabel: 'Descripción:'
                        },
                        {
                            xtype: 'numberfield',
                            x: 10,
                            y: 90,
                            width: 320,
                            name:'txtCosto',
                            fieldLabel: 'Costo'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    x: 50,
                    y: 220,
                    width: 310,
                    name:'rdgAgregarAnexo',
                    fieldLabel: 'Agregar Anexo?',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'SI',
                            name:'seleccion', 
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'NO',
                            inputValue: '2',
                             name:'seleccion'
                        }
                    ]
                },
            //===================================================================
          
                  
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

