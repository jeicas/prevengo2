Ext.define('myapp.view.evento.ListaComisionadoEvento', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaComisionadoEvento',
    itemId: 'listaComisionadoEvento',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    store: Ext.create('myapp.store.comisionado.ComisionadoEventoStore'),
    emptyText: 'No hay comisionado(s) asignado(s) a este evento',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [ {
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
                        name: 'btnNuevoComisionado',
                        text: 'Asignar Comisionado',
                        iconCls: 'editar'
                    },{  
                        xtype: 'button',
                        name: 'btnEliminarComisionado',
                        text: 'Eliminar Comisionado',
                        iconCls: 'editar'
                    },
                    
                     {
                        xtype: 'label',
                        name: 'lblIdActividad',
                        text: '',
       
                        hidden:true
     
                       
                    }
                ]
            },
                {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true,
                  items:[
                   
                ]
            }
        
        ];
    }
});