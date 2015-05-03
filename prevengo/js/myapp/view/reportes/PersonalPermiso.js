Ext.define('myapp.view.reportes.PersonalPermiso',{
    extend: 'Ext.window.Window',
    alias: 'widget.personalpermiso',
    itemId:'personalpermiso',
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
                    xtype: 'radiogroup',
                    width: 350,   
                    fieldLabel: 'Consultar por',  
                    name:'rdiofecha',
                    allowBlank: false,
                    margins:'0 2 20 30',
                    disabled:false,
                    labelWidth: 150,
                    items: [{
                        name:'rdffecha',
                        inputValue:1,
                        boxLabel: 'Dia'
                    },{
                        name:'rdffecha',
                        boxLabel: 'Rango',
                        inputValue:0
                    }]
               },{
                    xtype: 'datefield',
                    width: 500,
                    fieldLabel: 'Dia',
                    format: "Y/m/d",
                    name:'dia',
                    hidden:true,
                    editable: false,
                    margins : '0 0 0 10',
                    //value:new Date(), 
                    labelWidth: 150
                },{
                    xtype: 'datefield',
                    width: 500,
                    fieldLabel: 'Desde',
                    format: "Y/m/d",
                    name:'cmbfechades',
                    hidden:true,
                    editable: false,                    
                    margins:'0 2 20 0',
                    //value:new Date(), 
                    labelWidth: 150
                },{
                    xtype: 'datefield',
                    width: 500,
                    fieldLabel: 'Hasta',
                    format: "Y/m/d",
                    name:'cmbfechahas',
                    hidden:true,
                    editable: false,
                    margins:'0 2 20 0',                    
                    //value:new Date(),
                    labelWidth: 150
                },{
                    xtype: 'combobox',
                    width:500,
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbmotivo',
                    margins:'3 6 3 30',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.autorizacion.MotivoAutorizacionStore'),
                    allowBlank: false,
                    forceSelection:true,
                    fieldLabel: 'Motivo Autorizacion'
                },{
                    xtype: 'combobox',
                    width:500,
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbtipoautorizacion',
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
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                       xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        name: 'generarpersonalpermiso',
                        iconCls: 'generar',
                        text: "Generar reporte"
                    },{
                        xtype: 'button',
                        text: 'Limpiar',
                        iconCls:'limpiar',
                        tooltip: 'Limpiar',
                        name: 'limpiarlpersonalpermiso',
                    }]
                }]
            }]
        }]
    }
});