Ext.define('myapp.view.evento.ListaEventos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaEventos',
    requires: [
        'Ext.selection.CellModel',
        
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
    ],
    features: [{
            ftype: 'filters',
            local: true
        }, {
            id: 'group',
            ftype: 'groupingsummary',
            summaryType: 'count',
            groupHeaderTpl: '<font size=2><font size=2>{name}</font>',
            hideGroupedHeader: true,
            enableGroupingMenu: false
       }],
    
    viewConfig: {
        getRowClass: function (record, index) {
            var c = record.get('estatus');
            if (c === 'En Ejecucion') {
                return 'price-fall';
            } else if (c == 
                  'Completado') {
                return 'price-rise';
            }
        }
    },
    store: Ext.create('myapp.store.evento.EventoStore'),
    emptyText: 'No hay Eventos registrados',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [
              {
                dataIndex: 'fechaEvento',
                flex: 0.4,
                text: 'Fecha Limite',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'fechaEvento',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                dataIndex: 'idEv',
                flex: 0.1,
                text: 'id',
                hidden: true,
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'id',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
          
            {
                dataIndex: 'titulo',
                flex: 1,
                text: 'Titulo',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'titulo',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                dataIndex: 'agente',
                flex: 1,
                text: 'Agente',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'agente',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                dataIndex: 'alcance',
                flex: 0.4,
                text: 'Alcance',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'alcance',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                dataIndex: 'sector',
                flex: 0.4,
                text: 'Sector',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'sector',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                dataIndex: 'tipoEvento',
                flex: 0.6,
                text: 'Tipo de Evento',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'tipoEvento',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },
            {
                flex: 0.5,
                dataIndex: 'estatus',
                text: 'Estado',
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'estatus',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            }, 
        {
	        xtype: 'actioncolumn',
	        flex: 0.1,
	        id: 'cerrarEvento',
                name: 'cerrarEvento',
	        sortable: false,
	        menuDisabled: true,
	        items: [{
	            iconCls: 'icon-aceptar',
	            tooltip: 'Cerrar Evento',
	            scope: this,
	        }]
	    }]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true,
                items: [
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                store: this.store,
                displayInfo: true,
                items: [
                    {
                        xtype: 'button',
                        name: 'btnNuevo',
                        text: 'Nuevo',
                        iconCls: 'useradd'
                    },
                    {
                        xtype: 'button',
                        name: 'btnEditar',
                        text: 'Editar',
                        iconCls: 'useredit'
                    },
                    {
                        xtype: 'button',
                        name: 'btnCancelar',
                        text: 'Cancelar',
                        iconCls: 'userdelete'
                    },
                ]
            }];
    }
});