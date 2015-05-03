Ext.define('myapp.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainmenu',
    width: 300,
    layout: {
        type: 'auto'
    },
    collapsible: false,
    hideCollapseTool: false,
    conCls: 'sitemap',
    title: 'Menú', 
    layout:'accordion',

    layoutConfig:{
        titleCollapse: false,
        animate: true,
        activeOnTop: true,
        width: 100,
        minSize: 5,
        maxSize: 400
    }
});