Ext.define('myapp.view.registrar.Avance', {
  extend: 'Ext.form.Panel',
  alias: 'widget.avance',
  itemId: 'formAvance',
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
            width: 490,
            layout: 'absolute',
            items: [
                {
                    xtype: 'fieldset',
                    x: 10,
                    y: 130,
                    height: 170,
                    width: 460,
                    layout: 'absolute',
                    title: 'Detalles del Avance',
                    items: [
                       {
                            xtype: 'textareafield',
                            x: 0,
                            y: 10,
                            width: 430,
                            allowBlank :false,  
                            name:'txtDescripcion',
                            id:'txtDescripcion',
                            fieldLabel: 'Descripción:',
                            minLength:5,
                            maxLength: 95
                        }, {
                            xtype: 'combobox',
                            x: 0,
                            y: 90,
                            width: 210,
                            fieldLabel: 'Tipo de Avance',
                            name:'cmbTipoAvance',
                            id: 'cmbTipoAvance',
                            editable      : false,
                            store         : Ext.create('myapp.store.tipoAvance.TipoAvanceStore'),
                            valueField    : 'id',
                            displayField  : 'nombre',
                            emptyText     :'Seleccione',
                            queryMode     : 'local',
                            allowBlank    : false,
                            triggerAction : 'all'
                            
                        },
                       
                        {
                            xtype: 'numberfield',
                            x: 230,
                            y: 90,
                            width: 200,
                            name:'txtCosto',
                            id:'txtCosto',
                            fieldLabel: 'Costo:',
                            minLength:2,
                            maxLength:10
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    x: 20,
                    y: 20,
                    width: 430,
                    fieldLabel: 'Plan de Acción:',
                    name:'cmbActividad',
                    id: 'cmbActividad',
                    allowBlank :false,
                    editable      : false,
                    store         : Ext.create('myapp.store.actividad.ActividadStore'),
                    valueField    : 'id',
                    displayField  : 'descripcion',
                    emptyText     :'Seleccione',
                    queryMode     : 'local',
                    allowBlank    : false,
                    triggerAction : 'all'
                    
                },
                {
                            xtype: 'label',
                            x: 20,
                            y: 60,
                            name:'lblTitleNombreEvento',
                            id:'lblTitleNombreEvento',
                            text: 'Evento:'
                        },
                        {
                            xtype: 'label',
                            x: 130,
                            y: 60,
                            name:'lblNombreEvento',
                            id:'lblNombreEvento',
                            text: ''
                        },
                     {
                            xtype: 'label',
                            x: 20,
                            y: 80,
                            name:'lblTitleFechaAsignacion',
                            id:'lblTitleFechaAsignacion',
                            text: 'Fecha de Asignación:'
                        },
                        {
                            xtype: 'label',
                            x: 155,
                            y: 80,
                            name:'lblFechaAsignacion',
                            id:'lblFechaAsignacion',
                            text: ''
                        },
                        {
                    xtype: 'radiogroup',
                     x: 10,
                    y: 310,
                    width: 310,
                    name:'rdgAgregarAnexo',
                    fieldLabel: 'Agregar Anexo?',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'SI',
                            name:'seleccionAgregar', 
                            inputValue: '1'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'NO',
                            inputValue: '2',
                             name:'seleccionAgregar'
                        }
                    ]
                },
                        
                          {
                    xtype: 'fieldset',
                    x: 10,
                    y: 350,
                    name:'formAnexo',
                    height: 80,
                   
                    width: 460,
                    items: [
                        {
                            xtype: 'radiogroup',
                            width: 420,
                            name: 'rdgTipoAnexo',
                            fieldLabel: 'Tipo de Anexo',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Dirección', 
                                    inputValue: '1',
                                    name:'seleccion'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Archivo', 
                                     inputValue: '2',
                                     name:'seleccion'
                                }
                            ]
                        },
                         {
                            xtype: 'textfield',
                            width: 340,
                            name: 'txtSeleccion',
                           hidden:true
                            
                        },
                        
                        {
                            xtype: 'textfield',
                            width: 340,
                            name: 'txtDireccion',
                            visible:false,
                            fieldLabel: 'Dirección:'
                        },
                        {
                            xtype: 'filefield',
                            width: 320,
                            name: 'txtArchivo',
                             visible:false,
                            fieldLabel: 'Subir archivo:', 
                        }
                    ]
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
          },{
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
            text    : 'Guardar',
            disabled:false,
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