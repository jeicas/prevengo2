Ext.define('myapp.model.menu.Root', {
extend: 'Ext.data.Model',
uses: [
		'myapp.model.menu.Item'
	],
idProperty: 'id',
	fields: [
		{
			name: 'text'
		},
		{
			name: 'iconCls'
		},
		{
			name: 'id'
		},
		{
			name: 'controller'
		}
	],
	hasMany: {
		model: 'myapp.model.menu.Item',
		foreignKey: 'parent_id',
		name: 'items'
	}
});