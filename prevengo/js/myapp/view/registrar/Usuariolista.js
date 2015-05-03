Ext.define('myapp.view.registrar.Usuariolista', { 
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
	store: Ext.create('myapp.store.usuario.UsuarioStore'),
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
			flex: 0.5,
			renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="../../empleados/_DSC'+ value +'">';
			}
		},{
			flex: 0.5,
			text: 'Id',
			dataIndex: 'id',
			hidden: true
		},{
			flex: 1,
			dataIndex: 'usuario',
			text: 'Usuario'
		},{ 
			flex: 1,
			dataIndex: 'nacionalidad',
			text: 'Nacionalidad'
		},{ 
			flex: 1,
			dataIndex: 'cedula',
			flex: 1,
			text: 'Cédula'
		},{   
			flex: 1,
			text: 'Tipousuario', 
			dataIndex: 'ntipousuario'
		},{   
			flex: 0.5,
			hidden: true,
			text: 'idTipousuario', 
			dataIndex: 'tipousuario'
		},{ 
			flex: 1,
			dataIndex: 'nombre',
			text: 'Nombre',
			hidden: true
		},{ 
			flex: 1,
			dataIndex: 'apellido',
			text: 'Apellido',
			hidden: true
		},{ 
			flex: 1,
			text: 'Correo',
			dataIndex: 'correo',
			hidden: true
		},{
			flex: 1,
			text: 'Estatus',
			dataIndex: 'status',
			tdCls: 'x-change-cell',
			queryMode: 'local',       
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
