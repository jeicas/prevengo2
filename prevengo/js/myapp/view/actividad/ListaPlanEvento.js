Ext.define('myapp.view.actividad.ListaPlanEvento', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaPlanEvento',
    itemId: 'listaPlanEvento',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
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
                dataIndex: 'estatus',
                flex: 0.5,
                tdCls: 'x-change-cell',
                text: 'Estatus',
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