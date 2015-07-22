Ext.define('myapp.view.reportes.GraficoNivelEjecucion',
        {
            extend: 'Ext.chart.Chart',
            alias: 'widget.GraficoNivelEjecucion',
            animate: true,
            themes: 'Category1',
            shadow: true,
            height: 400,
            width: 400,
            store: Ext.create('myapp.store.reporte.CalcularNivelEjecucionStore'),
        legend: {
        position: 'right',
        labelFont: '15px Helvetica, sans-serif'
    },
    axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['ejecutadas', 'porejecutar'],
            title: 'Nº de Eventos por Tipo',
            grid: true,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Tipo de Evento'
        }],
    series: [{
            type: 'bar',
            axis: 'bottom',
            gutter: 80,
            highlight: true,
            column: true,
            xField: 'total',
            yField: ['ejecutadas', 'porejecutar'],
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
                    text: 'NIVEL DE EJECUCIÓN DEL PLAN',
                    font: '12px Arial',
                    width: 100,
                    height: 30,
                    x: 100, //the sprite x position
                    y: 10  //the sprite y position
                }
            ],
        });

