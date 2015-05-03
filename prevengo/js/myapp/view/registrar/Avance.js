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
                    y: 120,
                    height: 150,
                    width: 10,
                    layout: 'absolute',
                    title: 'Detalles del Avance',
                    items: [
                       {
                            xtype: 'combobox',
                            x: 0,
                            y: 10,
                            width: 230,
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
                            forceSelection: true,
                            triggerAction : 'all'
                            
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            x: 0,
                            y: 45,
                            width: 620,
                            name:'txtDescripcion',
                            id:'txtDescripcion',
                            fieldLabel: 'Descripción:'
                        },
                        {
                            xtype: 'numberfield',
                            x: 0,
                            y: 80,
                            name:'txtCosto',
                            id:'txtCosto',
                            fieldLabel: 'Costo:'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    x: 20,
                    y: 40,
                    width: 430,
                    fieldLabel: 'Plan de Acción:',
                    name:'cmbActividad',
                    id: 'cmbActividad',
                    editable      : false,
                    store         : Ext.create('myapp.store.actividad.ActividadStore'),
                    valueField    : 'id',
                    displayField  : 'descripcion',
                    emptyText     :'Seleccione dos',
                    queryMode     : 'local',
                    allowBlank    : false,
                    forceSelection: true,
                    triggerAction : 'all'
                    
                },{
                            xtype: 'label',
                            x: 470,
                            y: 25,
                            name:'lblTitleFechaAsignacion',
                            id:'lblTitleFechaAsignacion',
                            text: 'Fecha de Asignación:'
                        },
                        {
                            xtype: 'label',
                            x: 470,
                            y: 45,
                            name:'lblFechaAsignacion',
                            id:'lblFechaAsignacion',
                            text: '15-04-2015'
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
            iconCls : 'icon-buscar',
            text    : 'Cancelar',
            tooltip :'Catalogo Empleado',
            name    :'btnCancelar',

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
     
});