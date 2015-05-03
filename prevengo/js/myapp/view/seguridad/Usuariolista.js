Ext.define('myapp.view.seguridad.Usuariolista', { 
	extend: 'Ext.grid.Panel', 
	alias: 'widget.usuariolista',
	requires: [
        'Ext.selection.CellModel'
    ],
    bodyCls:'degradado',
    bodyStyle: {
        background: '#F0F8FF',
        padding: '10px',
         color: '#000',
    },
    viewConfig: {
        getRowClass: function(record, index) {
            var c = record.get('status');
            if (c == 'Inactivo') {
                return 'price-fall';
            } else if (c == 'Activo') {
                return 'price-rise';
            }
        }
    },
	store: Ext.create('myapp.store.seguridad.Usuario'),
	initComponent : function(){
	    var me = this;
	    me.columns= me.buildColumns();
	    me.dockedItems = me.buildDockedItems();
	    me.callParent();
	 },
	buildColumns: function(){
		return [{
			width: 250,
			text: 'Id',
			dataIndex: 'id',
			hidden: true
		},{
			width: 150, 
			dataIndex: 'usuario',
			text: 'usuario'
		},{ 
			width: 200,
			dataIndex: 'cedula',
			flex: 1,
			text: 'Cedula'
		},{ 
			width: 250,
			dataIndex: 'nacionalidad',
			text: 'Nacionalidad'
		},{   
			width: 150,
			text: 'Tipousuario', 
			dataIndex: 'ntipousuario'
		},{   
			width: 150,
			hidden: true,
			text: 'idTipousuario', 
			dataIndex: 'tipousuario'
		},{ 
			width: 250,
			dataIndex: 'nombre',
			text: 'nombre',
			hidden: true
		},{ 
			width: 250,
			dataIndex: 'apellido',
			text: 'apellido',
			hidden: true
		},{ 
			width: 250,
			text: 'Correo',
			dataIndex: 'correo',
			hidden: true
		},{
			width: 250,
			text: 'status',
			dataIndex: 'status',
			tdCls: 'x-change-cell',
			queryMode: 'local',       
		},{
			width: 250,
			text: 'foto',
			dataIndex: 'foto',
			hidden: true
		}]
	},
	buildDockedItems : function(){
		return [{
			xtype:'pagingtoolbar',
			dock:'bottom',
			store:this.store,
			displayInfo:true
		}];
	}
}); 
