Ext.define('myapp.view.evento.WinUsuarioSeleccionado', {
extend: 'Ext.window.Window',
  alias: 'widget.winUsuarioSeleccionado',
  itemId: 'winUsuarioSeleccionado',
  title:'Usuarios',
  height: 310,
  width: 500,
  modal:true,
  requires: [
  ],
  layout: {
   	type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [
      {
            xtype: 'container',
            height: 196,
            width: 452,
            layout: 'absolute',
            items: [
                {
                    xtype: 'fieldset',
                    x: 10,
                    y: 10,
                    height: 200,
                    width: 450,
                    layout: 'absolute',
                    title: 'Datos del Empleado',
                    items: [
                        {
                            xtype: 'image',
                            x: 20,
                            y: 10,
                            name :'fotoUsuario', 
                            height: 140,
                            width: 110,
                            src:''
                        },
                         {
                            xtype: 'textfield',
                            x: 140,
                            y: 5,
                            width: 260,
                            name :'txtCedula', 
                            fieldLabel: 'Nro. de Cédula:'
                        },
                        {
                            xtype: 'textfield',
                            x: 140,
                            y: 40,
                            width: 260,
                            name :'txtNombreCompleto', 
                            fieldLabel: 'Nombre:'
                        },
                        {
                            xtype: 'textfield',
                            x: 140,
                            y: 70,
                            width: 260,
                            name :'txtCargo', 
                            fieldLabel: 'Cargo:'
                        },
                        {
                            xtype: 'textfield',
                            x: 140,
                            y: 100,
                            width: 260,
                            name :'txtEnte', 
                            fieldLabel: 'Ente:'
                        },
                        {
                            xtype: 'textfield',
                            x: 140,
                            y: 130,
                            width: 260,
                            name :'txtDivision', 
                            fieldLabel: 'División:'
                        }
                    ]
                }
            ]
        }
    ]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      items: [ 
          {
            xtype : 'tbfill'
          },
          {
            xtype   : 'button',
            iconCls :'useredit1',
            name    :'btnCambiar', 
            text    : 'Cambiar Responsable',
            disabled:false,
            scope   : this,
          }
      ]
    }]
  }
});




      