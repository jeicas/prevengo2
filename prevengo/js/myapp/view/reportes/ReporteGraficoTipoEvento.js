Ext.define('myapp.view.reportes.ReporteGraficoTipoEvento', {
  extend: 'Ext.chart.Chart',
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
                title: 'Nº de Eventos por Tipo',
                grid: true,
                 label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
                }
            }, {
                type: 'Category',
                position: 'left',
                fields: ['nombre'],
                title: false
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                gutter: 80,
                xField: 'cantidad',
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