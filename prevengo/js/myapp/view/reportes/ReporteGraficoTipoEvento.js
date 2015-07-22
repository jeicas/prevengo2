Ext.define('myapp.view.reportes.ReporteGraficoTipoEvento', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteGraficoTipoEvento',
    requires: [
        'Ext.chart.CartesianChart',
        'myapp.view.reportes.GraficoTipoEvento'
    ],
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        var me = this;
        me.items = me.buildItem();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItem: function () {
        return [
            {
                xtype: 'GraficoTipoEvento',
            }


        ]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                flex: 1,
                dock: 'top',
                items: [ {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'grid',
                        height:58,
                        width: 280,
                        store: Ext.create('myapp.store.reporte.CalcularAvanceTotalStore'),
                        columns: [
                           
                             {
                                dataIndex: 'avance',
                                text: 'Avance Promedio', 
                                 flex: 0.5
                            },
                            {
                                dataIndex: 'calificacion',
                                text: 'Calificación', 
                                 flex: 0.5
                            }
                        ]
                    },
                    {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'grid',
                        height: 135,
                        width: 590,
                        store: Ext.create('myapp.store.reporte.ReportePorTipoEventoStore'),
                        columns: [
                            {
                                dataIndex: 'nombre',
                                text: 'Tipo Evento',
                                flex: 0.8
                            },
                            {
                                dataIndex: 'Completado',
                                text: 'Completado',
                                flex: 0.6
                            },
                            {
                                dataIndex: 'Pendiente',
                                text: 'Pendiente', 
                                 flex: 0.5
                            },
                            {
                                dataIndex: 'En Ejecucion',
                                text: 'En Ejecución',  
                                flex: 0.6
                            }, 
                            {
                                dataIndex: 'cantidad',
                                text: 'Total',  
                                flex: 0.4
                            },
                             {
                                dataIndex: 'avance',
                                text: 'Avance', 
                                 flex: 0.5
                            }
                        ]
                    }, {
                        xtype: 'tbfill'
                    }]
            }]
    }
});




/*extend: 'Ext.chart.Chart',
 alias: 'widget.reporteGraficoTipoEvento',
 animate: true,
 shadow: true,
 store:Ext.create('myapp.store.reporte.ReportePorTipoEventoStore') ,
 legend: {
 position: 'right'
 },
 axes: [{
 type: 'Numeric',
 position: 'bottom',
 fields: ['Completado','Pendiente', 'En Ejecucion'],
 title: false,
 grid: true,
 label: {
 renderer: function() {
 Ext.util.Format.numberRenderer('0,0')
 }
 }
 }, {
 type: 'Category',
 position: 'bottom',
 fields: ['nombre'],
 title: false
 }],
 series: [{
 type: 'bar',
 axis: 'bottom',
 gutter: 80,
 xField: 'tipo',
 yField: ['Completado','Pendiente', 'En Ejecucion'],
 stacked: true,
 tips: {
 trackMouse: true,
 width: 80,
 height: 28,
 renderer: function(storeItem, item) {
 this.setTitle('Cantidad: '+String(item.value[1]));
 }
 }
 }]
 });*/


/*extend: 'Ext.chart.Chart',
 alias: 'widget.reporteGraficoTipoEvento',
 animate: true,
 store: Ext.create('myapp.store.reporte.ReportePorTipoEventoStore'), // #1
 shadow: true,
 insetPadding: 60,
 theme: 'Base:gradients',
 legend: {
 position: 'right'
 },
 axes: [{
 type: 'Numeric', // #2
 position: 'left',
 fields: ['Completado','Pendiente', 'En Ejecucion'], // #3
 label: {
 renderer: Ext.util.Format.numberRenderer('0,0')
 },
 title: 'Cantidad',
 grid: true,
 minimum: 0
 }, {
 type: 'Category', // #4
 position: 'bottom',
 fields: ['nombre'], // #5
 title: 'Tipo de Eventos'
 }],
 
 series: [{
 type: 'column', // #6
 axis: 'left',
 highlight: true,
 xField: 'nombre',
 yField: ['Completado','Pendiente', 'En Ejecucion'],
 tips: {
 trackMouse: true,
 width: 140,
 height: 28,
 renderer: function (storeItem, item) {
 this.setTitle(storeItem.get('Completado'));
 this.setTitle(storeItem.get('Pendiente'));
 this.setTitle(storeItem.get('En Ejecucion'));
 }
 },
 label: {
 display: 'insideEnd',
 'text-anchor': 'middle',
 field: 'nombre',
 renderer: Ext.util.Format.numberRenderer('0'),
 orientation: 'vertical',
 color: '#333'
 }
 
 }], 
 items: [{
 type  : 'text',
 text  : 'Relación Cantidad de Eventos por Tipo y por Estatus',
 font  : '20px Arial',
 width : 100,
 height: 30,
 x : 350, //the sprite x position
 y : 20  //the sprite y position
 }]
 
 });*/