Ext.define('myapp.view.seguridad.PermisoForm', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.permisoForm',
    //itemId: 'listaAvanceFinal',

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
    //store: Ext.create('myapp.store.avance.AvanceFinalStore'),
    viewConfig: {
    },
    selType: 'checkboxmodel',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    store: Ext.create('myapp.store.permiso.PermisoStore'),
    emptyText: 'No hay  tiene permisos registrados',
    buildColumns: function () {
        return [
            {
                flex: 1,
                dataIndex: 'nombre',
                text: 'Opciones permitidas del menú',
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
                                    property: 'nombre',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            }, {
                flex: 0.3,
                dataIndex: 'apellido',
                text: '',
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
                                    property: 'apellido',
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
                xtype: 'toolbar',
                x: 20,
                y: 10,
                height: 40,
                width: 440,
                items: [
                    {
                        xtype: 'combobox',
                        width: 275,
                        fieldLabel: 'Tipo de Usuario:',
                        name: 'cmbTipoUsuario',
                        id: 'cmbTipoUsuario',
                        editable: false,
                        store: Ext.create('myapp.store.tipoUsuario.TipoUsuarioStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'button',
                       
                        name: 'btnNuevoTipoUsuario', 
                        iconCls: 'agregarNuevo'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        width: 155,
                    },
                    {
                        xtype: 'combobox',
                        width: 275,
                        fieldLabel: 'Menú',
                        name: 'cmbMenu',
                        id: 'cmbMenu',
                        editable: false,
                        store: Ext.create('myapp.store.menu.MenuStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        disabled: true,
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'button',
                        text: 'Añadir',
                        disabled: true,
                        name: 'btnAgregarMenu', 
                        iconCls: 'agregarNuevo'
                    }
                ]
            }];
    }
});





	