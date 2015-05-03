Ext.define('myapp.view.reportes.Reportegeneral',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportegen',
    itemId:'reportegen',
    autoShow: true,
    layout: {
        align: 'center',
        pack: 'center',
        type: 'vbox'
    },
    bodyCls:'degradado',
    bodyStyle: {
        background: '#F0F8FF',
        padding: '10px'
    },
    initComponent: function(){
        var me = this;
        me.items = me.buildItem();
        me.callParent();
    },
    buildItem : function(){
        return [{ 
            xtype: 'radiogroup',
            hideLabel: true,
            align: 'center',
            id:'reportes',
            width:1035,
            height:1035,
            name:'reportes',
            pack: 'center',
            columns:2,
            margins:'100 100 100 100',
            items: [{
                xtype: 'radiofield',
                name:'reportegen',
                value:'permiso',
                boxLabel: 'Listado de Empleado(s) con autorizaciones de permiso.',
                inputValue: '1',
                Widthlabel:300,
                heightlabel:300,
                style: 'margin-bottom: 20px',
                margins:'20 30 40 30',
                cheked:false
            },{
                xtype: 'radiofield',
                name:'reportegen',
                boxLabel: 'Listado de Oficina(s) con autorizaciones de permiso.',
                value:'listodogeneral',
                style: 'margin-bottom: 20px',
                inputValue: '2',
                labelWidth:1000,
                labelheight:300,
                margins:'20 30 40 30',
                cheked:false
            },{
                xtype: 'radiofield',
                name:'reportegen',
                boxLabel: 'Resumen de Autorizaciones por Empleado(s).',
                value:'salidaempleados',
                style: 'margin-bottom: 20px',
                inputValue: '3',
                labelWidth:1000,
                labelheight:300,
                margins:'20 30 40 30',
                cheked:false
            }]
        }]
    }
});