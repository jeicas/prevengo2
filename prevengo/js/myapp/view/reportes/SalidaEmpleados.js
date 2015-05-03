Ext.define('myapp.view.reportes.SalidaEmpleados',{
    extend: 'Ext.window.Window',
    alias: 'widget.salidaempleados',
    itemId:'salidaempleados',
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
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'combobox',
                        editable: false,
                        name: 'cmbnacionalidadplanilla',
                        fieldLabel: 'Cédula',
                        labelWidth: 90,
                        width: 200,
                        value:'V',
                        margins:'0 2 0 0',
                        selecOnFocus: true,
                        store: Ext.create('myapp.store.persona.nacionalidadStore'),
                        valueField: 'nombre',
                        displayField: 'nombre',
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all'
                   },{
                        xtype: 'textfield',
                        width: 300,
                        aling:'center',
                        margins:'0 2 7 0',
                        maskRe: /[0-9]/,
                        name:'textcedulaplanilla',
                        labelWidth: 90
                    }]
                },{
                    xtype: 'textfield',
                    width: 500,
                    aling:'center',
                    vtype:'letra',
                    margins:'0 0 0 0',
                    fieldLabel: 'Nombre',
                    name:'textnombre',
                    labelWidth: 90
                },{
                    xtype: 'textfield',
                    width: 500,
                    aling:'center',
                     margins:'0 2 20 0',
                    vtype:'letra',
                    fieldLabel: 'Apellido',
                    name:'textapellido',
                    labelWidth: 90
                },{
                    xtype: 'combobox',
                    editable: false,
                    name: 'departamento',
                    fieldLabel: 'Departamento',
                    labelWidth: 90,
                    width: 500,
                    margins:'0 2 20 0',
                    selecOnFocus: true,
                    store: Ext.create('myapp.store.empleado.Departamento'),
                    valueField: 'id',
                    displayField: 'nombre',
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all'
               }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                       xtype: 'tbfill'
                    },{
                        xtype: 'button',
                        name: 'generarsalidaempleados',
                        iconCls: 'generar',
                        text: "Generar reporte"
                    },{
                        xtype: 'button',
                        text: 'Limpiar',
                        iconCls:'limpiar',
                        tooltip: 'Limpiar',
                        name: 'limpiarsalidaempleados',
                    }]
                }]
            }]
        }]
    }
});