Ext.define('myapp.view.actividad.ListaEmpleadoPlan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaEmpleadoPlan',
    itemId: 'listaEmpleadoPlan',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    store: Ext.create('myapp.store.avance.PlanEmpleadosStore'),
    emptyText: 'No hay empleado(s) asignado(s) a esta actividad',
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
			flex: 0.5,
			dataIndex: 'fecha',
			text: 'Fecha de Asignación',
			
		},
            {
			text:'Foto',
			dataIndex:'foto',
			flex: 0.3,
			renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="../../empleados/_DSC'+ value +'">';
		   }
		},{
			flex: 0.8,
			dataIndex: 'nombrecompleto',
			text: 'Nombre y apellido',
			
		}
               
            ]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                dock: 'top',
                store: this.store,
                displayInfo: true,
                  items:[
                     {
                        xtype: 'button',
                        name: 'btnAsignarEmpleado',
                        text: 'Asignar Empleado',
                        iconCls: 'editar'
                    },
                    
                     {
                        xtype: 'label',
                        name: 'lblIdActividad',
                        text: '',
                        hidden:true
     
                       
                    }
                ]
            }
        
        ];
    }
});