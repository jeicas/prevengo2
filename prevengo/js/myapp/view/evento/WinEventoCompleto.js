Ext.define('myapp.view.evento.WinEventoCompleto', {
    extend: 'Ext.window.Window',
    alias: 'widget.EventoCompleto',
    itemId: 'winEventoCompleto',
    title: 'Evento',
    height: 770,
    width: 691,
    modal: true,
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
                height: 740,
                width: 787,
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        x: 10,
                        y: 5,
                        height: 200,
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
                                y: 120,
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
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        x: 10,
                        y: 220,
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
                                text: 'Descripción'
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        x: 10,
                        y: 390,
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
                        y: 560,
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
                                text: 'Descripción'
                            }
                        ]

                    },
                    {
                        xtype: 'form',
                        x: 280,
                        y: 220,
                        height: 490,
                        width: 400,
                        layout: 'absolute',
                        bodyPadding: 10,
                        title: '',
                        name: 'formPlan',
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
                                        y: 80,
                                        height: 340,
                                        width: 330,
                                        name: 'gridPlanDeAccion',
                                        store: Ext.create('myapp.store.actividad.ActividadAvanceStore'),
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
                                                text: 'Avance'
                                            },
                                            {
                                                dataIndex: 'tipoEvento',
                                                text: 'Tipo'
                                            },
                                            {
                                                dataIndex: 'ejecutor',
                                                text: 'Ejecutor'
                                            }
                                        ],
                                        viewConfig: {
                                            height: 273
                                        },
                                        dockedItems: [
                                            {
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                height: 73,
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        x: 10,
                                                        y: 10,
                                                        width: 330,
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
                    }
                ]
            }
        ]
    }

});



  