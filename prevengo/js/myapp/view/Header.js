Ext.define('myapp.view.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.appheader',
    height: 200,
    baseCls: 'price',
    width: '100%',
    ui: 'footer',
    items: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margins     : '50 0 50 100',
            items: [
                  {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    items: [
                         {
                            xtype: 'label',
                            name: 'lblTipoUsuario',
                            margins: '5 0 0 0',
                            text: 'CAROLKIS LINARES',
                            width: 150,
                        },
                         {
                            xtype: 'label',
                            name: 'lblTipoUsuario',
                            margins: '5 0 0 0',
                            text: 'ADMINISTRADOR',
                            width: 150,
                        },
                    ]
                },
                
                
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                       
                        {
                            xtype: 'button',
                            margins: '0 0 0 0',
                            tooltip: 'Cambiar Clave de Usuario',
                            itemId: 'perfil',
                            iconCls: 'user'
                        }, {
                            xtype: 'button',
                            margins: '0 0 0 10',
                            tooltip: 'Salir',
                            itemId: 'logout',
                            iconCls: 'logout'
                        }]
                },
              
                
            ]
        },
        {
            xtype: 'tbfill'
        }
    ]
});