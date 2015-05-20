Ext.define('myapp.view.actividad.ListaPlanEvento', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaPlanEvento',
    itemId: 'listaPlanEvento',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    store: Ext.create('myapp.store.actividad.ActividadEventoStore'),
    emptyText: 'No hay Plan de Acción registrado',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [ {
                dataIndex: 'id',
                hidden: true,
                flex: 0.2,
                text: 'id',
               
            },
             {
                dataIndex: 'fecha',
                flex: 0.5,
                text: 'Fecha Tope',
              
            },{
                dataIndex: 'descripcion',
                flex: 1.5,
                text: 'Descripcion',
              
            }, 
           
            {
                dataIndex: 'depende',
                flex: 1,
                text: 'Actividad Dependiente',
            },
             {
                dataIndex: 'iddepende',
                flex: 0.3,
                text: 'Id Dependiente',
            },
             {
                dataIndex: 'estatus',
                flex: 0.5,
                text: 'Estatus',
            },
            {
                dataIndex: 'observacion',
                flex: 0.5,
                text: 'Observacion',
            }
            ]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true,
                  items: []  
            },
            
            {
                xtype: 'toolbar',
                dock: 'top',
                store: this.store,
                displayInfo: true,
                  items:[{
                        xtype: 'button',
                        name: 'btnNuevoPlan',
                        text: 'Nuevo',
                        iconCls: 'useradd'
                    },
                    {
                        xtype: 'button',
                        name: 'btnEditarPlan',
                        text: 'Editar',
                        iconCls: 'useredit'
                    },
                     {
                        xtype: 'button',
                        name: 'btnCancelarPlan',
                        text: 'Cancelar',
                        iconCls: 'userdelete'
                    },
                     {
                        xtype: 'label',
                        name: 'lblIdEvento',
                        text: '',
                        hidden:true
     
                       
                    }
                ]
            }];
    }
});