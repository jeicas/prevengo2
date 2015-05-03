Ext.define('myapp.view.registrar.EditarAutorizacion', {
	extend: 'Ext.window.Window',
	alias: 'widget.editarAutorizacion',
	itemId: 'editarAutorizacion',
	height: 450,
	width: 600,
	modal:true,
	draggable:false,
	requires: ['myapp.util.Util'],
	resizable:false,

	initComponent: function() {
	    var me = this;
	    me.items = me.buildItem();
	    me.dockedItems = me.buildDockedItems();
	    me.callParent();
  	},
	buildItem : function(){
        return [{   
			xtype: 'form',
			bodyPadding: 5,
			layout: {
				type: 'vbox', 
				align: 'stretch'
			},
			items:[{
				xtype: 'fieldset',
				flex: 2,
				title: 'Datos del empleado',
				defaults: {
					anchor: '100%',
					xtype: 'textfield',
					//allowBlank: false,
					labelWidth: 60
				},
				items: [{
			        xtype: 'container',
	                layout: 'hbox',
					items: [{
	                    xtype: 'combobox',
	                    editable: false,
	                    name: 'nacionalidad',
	                    editable: false,
	                    fieldLabel: 'Cedula',
	                    labelWidth: 60,
	                    width: 120,
	                    value:'V',
	                    margins:'0 5 5 0',
	                    selecOnFocus: true,
	                    store: Ext.create('myapp.store.usuario.Nacionalidad'),
	                    valueField: 'nombre',
	                    displayField: 'nombre', 
	                    queryMode: 'local',
	                    allowBlank: false, 
	                    forceSelection: true,
	                    triggerAction: 'all',
	                    editable:false
	                },{
	                    xtype: 'textfield',
	                    labelWidth: 80,
	                    maskRe: /[0-9]/,
	                    name: 'cedula',
	                    width:258,
	                    minLength:6,
	                    maxLength:8,
	                    allowBlank: false
	                }]
	            },{
			        hidden: true,
			        name: 'id',
			    },{
			        fieldLabel: 'Nombre',
			        maxLength: 100,
			        name: 'nombre',
			        blankText:'Campo obligatorio.. ',
			        vtype:'letra'
			    },{
			        fieldLabel: 'Apellido',
			        maxLength: 100,
			        name: 'apellido',
			        blankText:'Campo obligatorio.. ',
			        vtype:'letra'
			    },{
			        fieldLabel: 'Email',
			        maxLength: 100,
			        name: 'correo',			        
				}]	
			},{
				xtype: 'fieldset',
				flex: 2,
				title: 'Datos de la autorización',
				layout: 'vbox',
				defaults: {
					anchor: '100%',
					xtype: 'textfield',
					//allowBlank: false,					
				},
				items: [{
			        xtype         : 'combobox',
			        width         : 380,
			        name          :'tipo',
			        labelWidth    : 130,
			        fieldLabel    : 'Tipo de autorizacion',
			        editable      : false,
			        store         : Ext.create('myapp.store.autorizacion.TipoAutorizacionStore'),
			        valueField    : 'id',
			        displayField  : 'nombre',
			        emptyText     :'Seleccione',
			        queryMode     : 'local',
			        allowBlank    : false,
			        forceSelection: true,
			        triggerAction : 'all'
			    },{
			        xtype         : 'combobox',
			        width         : 380,
			        name          :'motivoautorizacion',
			        labelWidth    : 130,
			        fieldLabel    : 'Motivo de autorizacion',
			        editable      : false,
			        store         : Ext.create('myapp.store.autorizacion.MotivoAutorizacionStore'),
			        valueField    : 'id',
			        displayField  : 'nombre',
			        emptyText     :'Seleccione',
			        queryMode     : 'local',
			        allowBlank    : false,
			        forceSelection: true,
			        triggerAction : 'all'
			    },{
			        xtype     : 'datefield',
			        width     : 380,
			        labelWidth: 130,
			        format 	  : 'Y-m-d',
			        fieldLabel: 'Fecha autorización',
			        name      : 'fechaautorizacion',
			        allowBlank: false,
			        minValue  : new Date()
			    },{
			        xtype     : 'timefield',
			        name      : 'horasalida',
			        width     : 380,
			        labelWidth: 130,
			        //hidden    : true,
			        fieldLabel: 'Hora salida',
			        increment : 30,
			        //allowBlank: false,
			        minValue  : '8:00 AM',
			        maxValue  : '6:00 PM'
			    },{
			        xtype     : 'timefield',
			        name      : 'horaentrada',
			        width     : 380,
			        labelWidth: 130,
			        fieldLabel: 'Hora entrada',
			        increment : 30,			        
			        //hidden    : true,
			        //allowBlank: false,
			        minValue  : '8:00 AM',
			        maxValue  : '6:00 PM'
			    },{
			        xtype     : 'textfield',
			        name      : 'placaVehiculo',
			        width     : 380,
			        labelWidth: 130,
			        fieldLabel: 'Placa vehículo',
			        increment : 30,
			        //hidden    : true,
			        //allowBlank: false,
			        minLength: 6,
			        maxLength : 7
			    }]	
			}]
		}]
	},
	buildDockedItems : function(){
    	return [{
	        xtype: 'toolbar',
	        flex: 1,
	        dock: 'bottom',
	        ui: 'footer',
	        layout: {
	            pack: 'end',
	            type: 'hbox'
	        },
	        items: [{
	            xtype: 'button',
	            text: 'Editar',	           	
	           	name:'editar',
	            iconCls: 'save'
	        }]
	    }]
	},
});