Ext.define('myapp.view.actividad.ListaPlanEventoAsignarEjecutor', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaPlanEventoAsignarEjecutor',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
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
    store: Ext.create('myapp.store.actividad.PlandeAccionStore'),
   viewConfig: {
        getRowClass: function (record, index) {
            var c = record.get('estatus');
            switch (c) {
                    case 'Sin Iniciar':
                       return 'price-riseSIniciar';
                        break;
                    case 'En Ejecución':
                       return 'price-riseEEjecucion';
                        break;
                    case 'En Revision':
                       return 'price-fallRevision';
                        break;
                    case 'Cancelado':
                      return 'price-riseCancelado';
                        break;
                    case 'Expirado':
                       return 'price-fallExpirado';
                        break;

                    case 'En Espera':
                   return 'price-riseEEspera';
                        break;
                    default:
                        return 'price-fallCompletado';
                        break;
                }

        }
    },
    //selType: 'checkboxmodel',
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
                dataIndex: 'idEvento',
                flex: 1.5,
                text: '',
                hidden: true,
            },
               {
                dataIndex: 'fecha',
                flex: 0.3,
                text: 'Fecha:',
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
                                    property: 'fecha',
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
                dataIndex: 'actividad',
                flex: 2,
                text: 'Actividad',
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
                                    property: 'actividad',
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
                dataIndex: 'estatus',
                flex: 0.3,
                 tdCls: 'x-change-cell',
                text: 'Estatus',
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
            }]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true,
                items: []
            }];
    }
});
       