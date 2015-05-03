Ext.define('myapp.model.menu.Item', {
extend: 'Ext.data.Model',
	uses: [
	 'myapp.model.menu.Root'
	],
	idProperty: 'id',
	fields: [{
		name: 'text'
	},{
		name: 'iconCls'
	},{
		name: 'className'
	},{
		name: 'id'
	},{
		name: 'parent_id'
	},{
		name: 'controller'
	}],
	belongsTo: {
		model: 'myapp.model.menu.Root',
		foreignKey: 'parent_id'
	}
});