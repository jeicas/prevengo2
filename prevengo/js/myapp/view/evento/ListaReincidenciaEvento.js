Ext.define('myapp.view.evento.ListaReincidenciaEvento', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaReincidenciaEvento',
    itemId: 'listaReincidenciaEvento',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.ux.ajax.SimManager',
    ],
    
    store: Ext.create('myapp.store.reincidencia.ReincidenciaEventoStore'),
    emptyText: 'No hay Reincidencia(s) asignado(s) a este evento',
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
                dataIndex: 'fecha',
                flex: 1.5,
                text: 'Fecha',
              
            },	 {
                dataIndex: 'descripcion',
                flex: 1.5,
                text: 'Descripcion',
              
            }, 
             {
                dataIndex: 'anexo',
                flex: 0.5,
                text: 'Anexo',
                renderer: function(value, metadata, record){
				return '<img width="50" height="50" src="'+ value +'">';
			}
              
            }, 
            {
                dataIndex: 'direccion',
                flex: 1,
                text: 'Direccion',
               renderer  : function(myValue, metadata,record) {
                   if (myValue==''){
                        return '';
                   }else{
                       return '<a href="'+myValue+'">'+'<img width="80" height="50" src="../../anexosReincidencia/icono-ver.png"></a>';
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
                        name: 'btnNuevoReincidencia',
                        text: 'Nuevo',
                        iconCls: 'useradd'
                    },{  
                        xtype: 'button',
                        name: 'btnEliminarReincidencia',
                        text: 'Eliminar',
                        iconCls: 'icon-eliminar'
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