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
                            name:'descripcion'
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
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Fecha'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Descripción'
                        }
                    ],
                     dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true
                                }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    x: 10,
                    y: 390,
                    height: 160,
                    width: 250,
                    title: 'Comisionados',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Nombre'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Cargo'
                        }
                    ],
                    viewConfig: {
                        width: 200
                    },
                     dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true
                                }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    x: 10,
                    y: 560,
                    height: 160,
                    width: 250,
                    title: 'Reincidencias',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Fecha'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Descripción'
                        }
                    ],
                    dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true
                                }
                    ]
                },
                {
                    xtype: 'fieldset',
                    x: 280,
                    y: 220,
                    height: 460,
                    width: 390,
                    layout: 'absolute',
                    title: 'Información del Plan de Acción:',
                    items: [
                        {
                            xtype: 'gridpanel',
                            x: 10,
                            y: 80,
                            height: 340,
                            width: 330,
                            title: 'Plan de Acción',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Avance'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Tipo'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Ejecutor'
                                }
                            ],
                            viewConfig: {
                                height: 273
                            },
                             dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true
                                }
                    ]
                        },
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 10,
                            width: 330,
                            fieldLabel: 'Responsable:'
                        },
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 40,
                            width: 330,
                            fieldLabel: 'Fecha:'
                        }
                    ]
                }
            ]
        }
        ]
    }
   
});