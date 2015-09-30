Ext.define('myapp.view.evento.WinEventoCompleto', {
    extend: 'Ext.window.Window',
    alias: 'widget.EventoCompleto',
    itemId: 'winEventoCompleto',
    title: 'Evento',
    height: 790,
    width: 1080,
    modal: true,
    requires: [
        ' Ext.chart.*',
        'myapp.view.reportes.GraficoNivelEjecucion'
    ],
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        var me = this;
        me.items = me.buildItem();
        me.callParent();
    },
    buildItem: function () {
        return [
            {
                xtype: 'container',
                height: 770,
                width: 787,
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        x: 10,
                        y: 5,
                        height: 230,
                        width: 660,
                        layout: 'absolute',
                        title: 'Datos del Evento',
                        items: [
                            {
                                xtype: 'textfield',
                                x: 10,
                                y: 10,
                                width: 300,
                                fieldLabel: 'Evento:',
                                name: 'titulo'
                            },
                            {
                                xtype: 'textfield',
                                x: 10,
                                y: 115,
                                width: 300,
                                fieldLabel: 'Agente:',
                                name: 'agente'
                            },
                            {
                                xtype: 'textfield',
                                x: 10,
                                y: 145,
                                width: 300,
                                fieldLabel: 'Tipo de Evento',
                                name: 'tipoEvento'
                            },
                            {
                                xtype: 'textfield',
                                x: 330,
                                y: 10,
                                width: 300,
                                fieldLabel: 'Fecha:',
                                name: 'fecha'
                            },
                            {
                                xtype: 'textfield',
                                x: 330,
                                y: 40,
                                width: 300,
                                fieldLabel: 'Sector:',
                                name: 'sector'
                            },
                            {
                                xtype: 'textfield',
                                x: 330,
                                y: 70,
                                width: 300,
                                fieldLabel: 'Alcance:',
                                name: 'alcance'
                            },
                            {
                                xtype: 'textfield',
                                x: 330,
                                y: 100,
                                width: 300,
                                fieldLabel: 'Estado:',
                                name: 'estatus'

                            },
                            {
                                xtype: 'textareafield',
                                x: 10,
                                y: 40,
                                width: 300,
                                fieldLabel: 'Descripción',
                                name: 'descripcion'
                            },
                            {
                                xtype: 'textareafield',
                                x: 330,
                                y: 130,
                                width: 300,
                                fieldLabel: 'Observación',
                                
                                name: 'observacion'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        x: 10,
                        y: 240,
                        height: 160,
                        width: 250,
                        title: 'Lineamientos',
                        name: 'gridLineamiento',
                        emptyText: 'No tiene lineamientos registrados',
                        store: Ext.create('myapp.store.lineamiento.LineamientoEventoStore'),
                        columns: [
                            {
                                dataIndex: 'fecha',
                                flex: 0.7,
                                text: 'Fecha'
                            },
                            {
                                dataIndex: 'descripcion',
                                flex: 1,
                                 renderer: function(v){ 
                             return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')
                         },
                                text: 'Descripción'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        x: 10,
                        y: 410,
                        height: 160,
                        width: 250,
                        name: 'gridComisionado',
                        store: Ext.create('myapp.store.comisionado.ComisionadoEventoStore'),
                        emptyText: 'No tiene comisionados registrados',
                        title: 'Comisionados',
                        columns: [
                            {
                                dataIndex: 'nombrecompleto',
                                flex: 1,
                                text: 'Nombre'
                            },
                            {
                                dataIndex: 'cargo',
                                flex: 0.7,
                                text: 'Cargo'
                            }
                        ],
                        viewConfig: {
                            width: 200
                        }

                    },
                    {
                        xtype: 'gridpanel',
                        x: 10,
                        y: 580,
                        height: 160,
                        width: 250,
                        name: 'gridReincidencia',
                        store: Ext.create('myapp.store.reincidencia.ReincidenciaEventoStore'),
                        emptyText: 'No tiene reincidencias registradas',
                        title: 'Reincidencias',
                        columns: [
                            {
                                dataIndex: 'fecha',
                                flex: 0.7,
                                text: 'Fecha'
                            },
                            {
                                dataIndex: 'descripcion',
                                flex: 1,
                                 renderer: function(v){ 
                             return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')
                         },
                                text: 'Descripción'
                            }
                        ]

                    },
                    {
                        xtype: 'container',
                        x: 270,
                        y: 240,
                        height: 490,
                        width: 400,
                        layout: 'absolute',
                        items: [
                            {
                                xtype: 'fieldset',
                                x: 10,
                                y: 10,
                                height: 460,
                                width: 380,
                                layout: 'absolute',
                                title: 'Información del Plan de Acción:',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        x: 10,
                                        y: 10,
                                        height: 410,
                                        width: 330,
                                        name: 'gridPlanDeAccion',
                                        columnLines: true,
                                        store: Ext.create('myapp.store.actividad.ActividadAvance2Store'),
                                        emptyText: 'No tiene Plan de accion',
                                        title: 'Plan de Acción',
                                        features: [{
                                                id: 'group',
                                                ftype: 'groupingsummary',
                                                summaryType: 'count',
                                                groupHeaderTpl: '<font size=2><font size=2>{name}</font>',
                                                hideGroupedHeader: true,
                                                enableGroupingMenu: false
                                            }],
                                        columns: [
                                            {
                                                dataIndex: 'avance',
                                                text: 'Avance',
                                                flex: 0.7

                                            },
                                            {
                                                dataIndex: 'tipoEvento',
                                                text: 'Tipo',
                                                flex: 0.4
                                            },
                                            {
                                                dataIndex: 'ejecutor',
                                                text: 'Ejecutor',
                                                flex: 0.5
                                            }
                                        ],
                                        viewConfig: {
                                            height: 273
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                height: 53,
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        x: 10,
                                                        y: 10,
                                                        width: 300,
                                                        name: 'responsable',
                                                        fieldLabel: 'Responsable:'
                                                    }

                                                ]
                                            }
                                        ]
                                    }

                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        x: 670,
                        y: 240,
                        height: 490,
                        width: 400,
                        items: [
                            
                           
                            {
                                xtype: 'GraficoNivelEjecucion',
                               
                            }, 
                             {
                        xtype: 'grid',
                        height:58,
                        width: 320,
                        name: 'gridCalcularNivel',
                        columnLines: true,
                        store:  Ext.create('myapp.store.reporte.CalcularNivelEjecucionStore'),
                        columns: [
                           
                             {
                                dataIndex: 'name1',
                                text: '', 
                                 flex: 1
                            },
                            {
                                dataIndex: 'ejecutadas',
                                text: 'Ejecutadas', 
                                 flex: 1.3
                            }, 
                             {
                                dataIndex: 'porejecutar',
                                text: 'Por Ejecutar', 
                                 flex: 1.3
                            },
                            {
                                dataIndex: 'total',
                                text: 'Total', 
                                 flex: 0.7
                            },
                        ]
                    }
                        ]
                    }
                ]
            }
        ]
    }

});



  