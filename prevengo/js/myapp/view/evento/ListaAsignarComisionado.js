Ext.define('myapp.view.evento.ListaAsignarComisionado', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaAsignarComisionado',
    itemId: 'listaAsignarComisionado',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',    
    ],
     features:[{
        ftype: 'filters',
        local: true
	}], 
    store: Ext.create('myapp.store.usuario.UsuarioStore'),
    emptyText: 'No hay comisionado asignado(s) a este Evento',
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
			text:'',
			dataIndex:'id',
			flex: 0.3,
			hidden: true
		},
            {
			text:'Foto',
			dataIndex:'foto',
			flex: 0.3,
			renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="../../empleados/_DSC'+ value +'">';
		   }
		},{
			flex: 0.5,
			dataIndex: 'cedula',
			text: 'Nro. de Cedula',
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
			flex: 0.8,
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
			
		},
                {
			flex: 0.5,
			dataIndex: 'ente',
			text: 'Ente',
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
		                        property     : 'ente',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
			
		},
                 {
			flex: 1,
			dataIndex: 'division',
			text: 'Division',
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
		                        property     : 'division',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
			
		},
                 {
			flex: 0.5,
			dataIndex: 'tipousuario',
			text: 'Tipo de Usuario',
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
		                        property     : 'tipousuario',
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
                        name: 'btnGuardar',
                        text: 'Guardar',
                        iconCls: 'editar'
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
            }];
    }
});