Ext.define('myapp.view.registrar.Gridbuscaremp', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridbuscaremp',
	itemId: 'gridbuscaremp',

	requires: [
        'Ext.selection.CellModel', 
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
    ],
    features:[{
        ftype: 'filters',
        local: true
	},{
    	id: 'group',
    	ftype: 'groupingsummary',
    	
    	groupHeaderTpl:'<font size=2><font size=2>{name}</font>',
    	hideGroupedHeader: true,
    	enableGroupingMenu: false
    }], 
    viewConfig: {
    },
	store: Ext.create('myapp.store.empleado.EmpleadosGrid'),
	selType: 'checkboxmodel',
	//selModel: selModel,
	columnLines: true,
	initComponent : function(){
	    var me = this;
	    me.columns= me.buildColumns();
	    me.dockedItems = me.buildDockedItems();
	    me.callParent();
	 },
	 
	buildColumns: function(){
		return [{
			text:'Foto',
			dataIndex:'foto',
			flex: 0.3,
			renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="../../empleados/_DSC'+ value +'">';
			}
		},{ 
			dataIndex: 'nacionalidad',
			flex: 0.2,
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
			flex: 0.5,
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
			dataIndex: 'nombre',
			text: 'Nombres',
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
		                        property     : 'nombre',
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
			dataIndex: 'apellido',
			text: 'Apellidos',
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
		                        property     : 'apellido',
		                        value         : this.value,
		                        anyMatch      : true,
		                        caseSensitive : false
		                    });
			            }
				    },
				    buffer: 500
				}
			}
		}]
	},
	buildDockedItems : function(){
		return [{
			xtype:'pagingtoolbar',
			dock:'bottom',
			store:this.store,
			displayInfo:true,
			items: [{ 
					xtype: 'button',
                    id      :'agregar',
        			text    : 'Agregar',
        			iconCls:'aceptar'
                 }]
		}];
	}
});