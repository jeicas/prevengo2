Ext.define('myapp.view.reportes.GraficoTipoEvento', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.GraficoTipoEvento',
    animate: true,
    themes: 'Category1',
    shadow: true,
    store: Ext.create('myapp.store.reporte.ReportePorTipoEventoStore'),
    legend: {
        position: 'right',
        labelFont: '15px Helvetica, sans-serif'
    },
    axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['Completado', 'Pendiente', 'En Ejecucion'],
            title: 'Nº de Eventos por Tipo',
            grid: true,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['nombre'],
            title: 'Tipo de Evento'
        }],
    series: [{
            type: 'bar',
            axis: 'bottom',
            gutter: 80,
            highlight: true,
            column: true,
            xField: 'cantidad',
            yField: ['Completado', 'Pendiente', 'En Ejecucion'],
            stacked: true,
            tips: {
                trackMouse: true,
                width: 80,
                height: 28,
                renderer: function (storeItem, item) {
                    this.setTitle('Cantidad: ' + String(item.value[1]));
                }
            }
        }],
    items: [
        {
            type: 'text',
            text: 'Desempeño General Por Tipo de Evento',
            font: '20px Arial',
            width: 100,
            height: 30,
            x: 350, //the sprite x position
            y: 20  //the sprite y position
        }
    ],
});

