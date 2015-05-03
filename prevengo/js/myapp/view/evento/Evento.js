Ext.define('myapp.view.evento.Evento', {
  extend: 'Ext.form.Panel',
  alias: 'widget.evento',
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
                        xtype: 'textfield',
                        x: 10,
                        y: 20,
                        width: 300,
                        fieldLabel: 'Nombre del Evento:',
                    },
                    {
                        xtype: 'textareafield',
                        x: 320,
                        y: 20,
                        width: 300,
                        fieldLabel: 'Descripción:'
                    },
                    {
                        xtype: 'combobox',
                        x: 10,
                        y: 100,
                        width: 300,
                        fieldLabel: 'Tipo de Evento:',
                        name:'cmbTipoEvento',
                        id: 'cmbTipoEvento',
                        editable      : false,
                        store         : Ext.create('myapp.store.tipoEvento.TipoEventoStore'),
                        valueField    : 'id',
                        displayField  : 'nombre',
                        emptyText     :'Seleccione',
                        queryMode     : 'local',
                        allowBlank    : false,
                        forceSelection: true,
                        triggerAction : 'all'
                    },
                    {
                        xtype: 'combobox',
                        x: 10,
                        y: 60,
                        width: 300,
                        fieldLabel: 'Agente Emisor:',
                        name:'cmbAgente',
                        id: 'cmbAgente',
                        editable      : false,
                        store         : Ext.create('myapp.store.agente.AgenteStore'),
                        valueField    : 'id',
                        displayField  : 'nombre',
                        emptyText     :'Seleccione',
                        queryMode     : 'local',
                        allowBlank    : false,
                        forceSelection: true,
                        triggerAction : 'all'
                    },
                    {
                        xtype: 'combobox',
                        x: 320,
                        y: 100,
                        width: 300,
                        fieldLabel: 'Alcance',
                        name:'cmbAlcance',
                        id: 'cmbAlcance',
                        editable      : false,
                        store         : Ext.create('myapp.store.alcance.AlcanceStore'),
                        valueField    : 'id',
                        displayField  : 'nombre',
                        emptyText     :'Seleccione',
                        queryMode     : 'local',
                        allowBlank    : false,
                        forceSelection: true,
                        triggerAction : 'all' 
                    },
                    {
                        xtype: 'combobox',
                        x: 10,
                        y: 140,
                        width: 300,
                        fieldLabel: 'Sector:',
                        name:'cmbSector',
                        id: 'cmbSector',
                        editable      : false,
                        store         : Ext.create('myapp.store.sector.SectorStore'),
                        valueField    : 'id',
                        displayField  : 'nombre',
                        emptyText     :'Seleccione',
                        queryMode     : 'local',
                        allowBlank    : false,
                        forceSelection: true,
                        triggerAction : 'all'
                    },
                    {
                        xtype: 'numberfield',
                        x: 320,
                        y: 140,
                        width: 300,
                        fieldLabel: 'Presupuesto:'
                    },
                    {
                        xtype: 'datefield',
                        x: 10,
                        y: 170,
                        width: 300,
                        fieldLabel: 'Fecha del Evento:'
                    },
                    {
                        xtype: 'datefield',
                        x: 320,
                        y: 170,
                        width: 300,
                        fieldLabel: 'Fecha del Preaviso:'
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