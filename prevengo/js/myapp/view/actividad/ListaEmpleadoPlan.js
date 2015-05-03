Ext.define('myapp.view.actividad.ListaAsignarEjecutorAPlan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaAsignarEjecutorAPlan',
    itemId: 'listaAsignarEjecutorAPlan',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    //store: Ext.create('myapp.store.actividad.EmpleadosStore'),
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
			flex: 0.2,
			text: 'ID',
			hidden: true,
			items    : {
				xtype: 'textfield',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
				    keyup: function() {
			           	var store = this.up('grid').store;
			           	store.clearFilter();
			            if (this.value) {
		                   	store.filter({
		                        property     : 'id',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
		},{
			text:'Foto',
			dataIndex:'foto',
			flex: 0.3,
			renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="../../empleados/_DSC'+ value +'">';
			}
		},{ 
			dataIndex: 'nacionalidad',
			flex: 0.1,
			text: 'Nac.',
			items    : {
				xtype: 'textfield',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
				    keyup: function() {
			           	var store = this.up('grid').store;
			           	store.clearFilter();
			            if (this.value) {
		                   	store.filter({
		                        property     : 'nacionalidad',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
		},{ 
			dataIndex: 'cedula',
			flex: 0.3,
			text: 'Cédula',
			items    : {
				xtype: 'textfield',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
				    keyup: function() {
			           	var store = this.up('grid').store;
			           	store.clearFilter();
			            if (this.value) {
		                   	store.filter({
		                        property     : 'cedula',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
		},{
			flex: 1,
			dataIndex: 'nombrecompleto',
			text: 'Nombre y apellido',
			items    : {
				xtype: 'textfield',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
				    keyup: function() {
			           	var store = this.up('grid').store;
			           	store.clearFilter();
			            if (this.value) {
		                   	store.filter({
		                        property     : 'nombrecompleto',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
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
                        name: 'btnEditarPlan',
                        text: 'Editar',
                        iconCls: 'editar'
                    },
                     {
                        xtype: 'button',
                        name: 'btnCancelarPlan',
                        text: 'Cancelar Actividad',
                        iconCls: 'cancelar'
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