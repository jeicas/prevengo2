Ext.define('myapp.controller.Menu', {
	extend: 'Ext.app.Controller',
	models: ['menu.Root', 'menu.Item'],
	stores: ['Menu'],
	views:  ['menu.Accordion','menu.Item'],
  refs: [{
    ref: 'mainPanel',
		selector: 'mainpanel'
	},
    {
    ref: 'Header',
		selector: 'appheader'
	},],
  init: function(application) {
    this.control({
      "mainmenu": {
       	render: this.onPanelRender
      },
      "mainmenuitem": {
        itemclick: this.onTreepanelItemClick
      }
   	});
	},
  onPanelRender: function(abstractcomponent, options) {
    this.getMenuStore().load(function(records, op, success){
      var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
      var header = Ext.ComponentQuery.query('appheader')[0];
      
         console.log(header);
         console.log(header.items.items[4].items.items[0].items.items[0]);
      Ext.each(records, function(root){
       header.items.items[4].items.items[0].items.items[1].setText(records[0].get('usuario'));
       header.items.items[4].items.items[0].items.items[0].setText('BIENVENIDO');
          
      
        var menu = Ext.create('myapp.view.menu.Item',{
          title: root.get('text'),
          iconCls: root.get('iconCls'),
        });
        Ext.each(root.items(), function(itens){
          Ext.each(itens.data.items, function(item){
            menu.getRootNode().appendChild({
              text: item.get('text'), 
              leaf: true, 
              iconCls: item.get('iconCls'),
              id: item.get('id'),
              className: item.get('className'),
              controller: item.get('controller')
            });
          }); 
        });
        menuPanel.add(menu);
      }); 
    });
  },
	onTreepanelSelect: function(selModel, record, index, options) {
		var mainPanel = this.getMainPanel(); 
		var newTab = mainPanel.items.findBy(
      function (tab){ 
        return tab.title === record.get('text'); 
      }
    );
    if(record.get('text')!='Cerrar sesión'){
      if(record.get('text')=='Cambio de clave'){
        
        Ext.create('myapp.view.seguridad.Contrasena');
      }else{
    		if (!newTab){ 
          this.getController(record.raw.controller);
    		  newTab = mainPanel.add({  
      			xtype: record.raw.className,
      			closable: true,
      			iconCls: record.get('iconCls'),
      			title: record.get('text')
    			});
    		}
  	    mainPanel.setActiveTab(newTab);  
      }
    }else{
      this.getController(record.raw.controller);
    }
	},
	onTreepanelItemClick: function(view, record, item, index, event,options){
		this.onTreepanelSelect(view, record, index, options);
	},
});