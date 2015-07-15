Ext.define('myapp.view.reportes.ReporteFechas', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.reporteFechas',
    animate: true,
    store: Ext.create('myapp.store.reporte.ReportePorTipoEventoStore'), // #1
    shadow: true,
    insetPadding: 60,
    theme: 'Base:gradients',
    axes: [{
            type: 'Numeric', // #2
            position: 'left',
            fields: ['cantidad0','cantidad1'], // #3
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
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function (storeItem, item) {
                    
                    
                      switch (storeItem.get('estatus')) {
                    case '1':
                        this.setTitle('Pendiente' + storeItem.get('cantidad0'))
                        break;
                    case '2':
                       this.setTitle('En Ejecucion' + storeItem.get('cantidad0'))
                        break;
                    case '3':
                        this.setTitle('Cancelado' + storeItem.get('cantidad0'))
                        break;
                    case '4':
                       this.setTitle('Sin Plan' + storeItem.get('cantidad0'))
                        break;
                    case '5':
                       this.setTitle('Expirado' + storeItem.get('cantidad0'))
                        break;

                    default:
                       this.setTitle('Completado' + storeItem.get('cantidad0'))
                        break;
                }
                   
                   

                }
            },
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'nombre',
                renderer: Ext.util.Format.numberRenderer('10'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'nombre', // #7
            yField: ['cantidad0','cantidad1'] // #8
        }]
});