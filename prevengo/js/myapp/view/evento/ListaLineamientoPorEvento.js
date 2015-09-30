Ext.define('myapp.view.evento.ListaLineamientoPorEvento', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaLineamientoPorEvento',
    itemId: 'listaLineamientoPorEvento',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    store: Ext.create('myapp.store.lineamiento.LineamientoEventoStore'),
    emptyText: 'No hay lineamientos registrado',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [ {
                dataIndex: 'idLin',
                hidden: true,
                flex: 0.2,
                text: 'idLin',
               
            }, {
                dataIndex: 'descripcion',
                flex: 1.5,
                renderer: function(v){ 
                             return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')
                         },
                text: 'Descripcion',
              
            }
            ]
    },
    buildDockedItems: function () {
        return [
        {
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
                  items:[{
                        xtype: 'button',
                        name: 'btnNuevoLineamiento',
                        text: 'Nuevo',
                        hidden: false,
                        iconCls: 'useradd'
                    },
                    {
                        xtype: 'button',
                        name: 'btnEditarLineamiento',
                        text: 'Editar',
                        hidden: false,
                        iconCls: 'useredit'
                    },
                     {
                        xtype: 'button',
                        name: 'btnEliminarLineamiento',
                        text: 'Eliminar',
                        hidden: false,
                        iconCls: 'icon-eliminar'
                    }
                ]
            }];
    }
});