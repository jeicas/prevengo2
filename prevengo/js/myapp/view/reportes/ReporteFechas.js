Ext.define('myapp.view.reportes.ReporteFechas',{
    extend: 'Ext.window.Window',
    alias: 'widget.reportefechas',
    itemId:'reportefechas',
    autoShow: true,
    width:540,
    modal:true,
    layout: {
        align: 'center',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;
        me.items = me.buildItem();
        me.callParent();
    },
    buildItem : function(){
        return [{ 
            items: [{
            xtype: 'form',
            bodyPadding: 10,
            width:530,
            border:false,
                items: [{
                    xtype: 'datefield',
                    width: 460,
                    fieldLabel: 'Dia',
                    format: "Y/m/d",
                    name:'dia',
                    editable: false,
                    margins : '0 0 0 10',
                    value:new Date(), // <-- a default value
                    labelWidth: 150,
                    hidden:false
                },{
                    xtype: 'datefield',
                    width: 460,
                    fieldLabel: 'Mes: Desde',
                    format: "Y/m/d",
                    name:'mesdesde',
                    editable: false,
                    margins : '0 0 0 10',
                    value:new Date(), // <-- a default value
                    labelWidth: 150,
                    hidden:false
                },{
                    xtype: 'datefield',
                    width: 460,
                    fieldLabel: 'Hasta',
                    name:'meshasta',
                    margins : '0 0 0 10',
                    value:new Date(), // <-- a default value
                    fieldLabel: 'Hasta',
                    format: "Y/m/d",
                    editable: false,
                    maxValue: new Date(),
                    allowBlank: false,
                    labelWidth: 150
                },{
                    xtype: 'combobox',
                    width: 500,
                    fieldLabel: 'Fecha',
                    labelWidth: 150,
                    margins:'0 2 20 0',
                    name: 'cmbfechades',
                    store: Ext.create('myapp.store.reportes.Fechadesde'),
                    valueField: 'fecha',
                    displayField: 'fecha',
                    queryMode: 'local',
                    emptyText:' ',
                    triggerAction: 'all',
                    //forceSelection: true,
                    editable:true,
                },{
                    xtype: 'combobox',
                    width: 500,
                    fieldLabel: 'Hasta',
                    labelWidth: 150,
                     margins:'0 2 20 0',
                    name: 'cmbfechahas',
                    store: Ext.create('myapp.store.reportes.Fechahasta'),
                    valueField: 'fecha',
                    displayField: 'fecha',
                    queryMode: 'local',
                    emptyText:' ',
                    triggerAction: 'all',
                    editable:true,
                },{
                    xtype: 'combobox',
                    width:500,
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbsemanas',
                    margins:'3 6 3 30',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.autorizacion.TipoAutorizacionStore'),
                    allowBlank: false,
                    forceSelection:true,
                    fieldLabel: 'Tipo de Autorizacion'
                },{
                    xtype: 'combobox',
                    width:500,
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbmeses',
                    margins:'3 6 3 30',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.empleado.Departamento'),
                    allowBlank: false,
                    forceSelection:true,
                    fieldLabel: 'Departamento'
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                       xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        name: 'generarreportefechas',
                        iconCls: 'generar',
                        text: "Generar reporte"
                    },{
                        xtype: 'button',
                        text: 'Limpiar',
                        iconCls:'limpiar',
                        tooltip: 'Limpiar',
                        name: 'limpiarreportefechas',
                    }]
                }]
            }]
        }]
    }
});