var showSummary = true;
var encode = false;
var local = true;
var filters = {
    ftype: 'filters',        
    encode: encode, // json encode the filter query
    local: local,   // defaults to false (remote filtering)
     filters: [{
        // required configs
        type: 'string',
        dataIndex: 'name',

        // optional configs
        value: 'foo',
        active: true, // default is false
        iconCls: 'ux-gridfilter-text-icon' // default
        // any Ext.form.field.Text configs accepted
    }]
    
};
Ext.define('myapp.view.seguridad.Gridbuscaremp', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridbuscaremp',
	itemId: 'gridbuscaremp',

	requires: [
        'Ext.selection.CellModel', 
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
    ],
    features    : [filters,
    //{id: 'group',ftype: 'groupingsummary',groupHeaderTpl:'{name}',hideGroupedHeader: true,enableGroupingMenu: false}
    ],
    viewConfig: {
        /*getRowClass: function(record, index) {
            var c = record.get('status');
            if (c == 'Inactivo') {
                return 'price-fall';
            } else if (c == 'Activo') {
                return 'price-rise';
            }
        }*/
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
			dataIndex: 'nacionalidad',
			flex: 0.2,
			text: 'Nac.',
			filter: {
                type: 'string'
            }
		},{ 
			dataIndex: 'cedula',
			flex: 0.5,
			text: 'Cédula',
			filter: {
                type: 'string'
            }
		},{
			flex: 1,
			dataIndex: 'nombre',
			text: 'Nombres',
			filter: {
                type: 'string'
            }
		},{
			flex: 1,
			dataIndex: 'apellido',
			text: 'Apellidos',
			filter: {
                type: 'string'
            }
		},{
			flex: 1,
			dataIndex: 'foto',
			text: 'Fotos',
			hidden: true,
			filter: {
                type: 'string'
            }

		}]
	},
	buildDockedItems : function(){
		return [{
			xtype:'pagingtoolbar',
			dock:'bottom',
			store:this.store,
			displayInfo:true,
			items: [
 	  
 	            { xtype: 'button',
                     id      :'agregar',
        			text    : 'Agregar',
        			iconCls:'aceptar'
                 }]
		}];
	}
});