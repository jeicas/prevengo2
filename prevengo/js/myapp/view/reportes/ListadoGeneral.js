Ext.define('myapp.view.reportes.ListadoGeneral',{
    extend: 'Ext.window.Window',
    alias: 'widget.listadogeneral',
    itemId:'listadogeneral',
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
                    xtype: 'combobox',
                    width:500,
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbdepartamento',
                    margins:'3 6 3 30',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.empleado.Departamento'),
                    forceSelection:true,
                    fieldLabel: 'Departamento:'
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                       xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        name: 'generarlistado',
                        iconCls: 'generar',
                        text: "Generar reporte"
                    },{
                        xtype: 'button',
                        text: 'Limpiar',
                        iconCls:'limpiar',
                        tooltip: 'Limpiar',
                        name: 'limpiarlistadogeneral',
                    }]
                }]
            }]
        }]
    }
});
