Ext.define('myapp.view.evento.WinEvento', {
    extend: 'Ext.window.Window',
    alias: 'widget.winEvento',
    itemId: 'winEvento',
    title: 'Evento',
    height: 530,
    width: 420,
    modal: true,
    requires: [
        'myapp.view.evento.Evento'
    ],
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        var me = this;
        me.items = me.buildItem();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItem: function () {
        return [
            {
                xtype: 'container',
                height: 475,
                width: 396,
                layout: 'absolute',
                items: [
                    {
                        xtype: 'textfield',
                        x: 20,
                        y: 20,
                        width: 300,
                        fieldLabel: 'Nombre del Evento:',
                        name: 'txtTitulo'
                    },
                    {
                        xtype: 'textareafield',
                        x: 20,
                        y: 60,
                        width: 300,
                        fieldLabel: 'Descripción:',
                        name: 'txtDescripcion'
                    },
                    {
                        xtype: 'combobox',
                        x: 20,
                        y: 200,
                        width: 300,
                        fieldLabel: 'Tipo de Evento:',
                        name: 'cmbTipoEvento',
                        id: 'cmbTipoEvento',
                        editable: false,
                        store: Ext.create('myapp.store.tipoEvento.TipoEventoStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                        
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'combobox',
                        x: 20,
                        y: 160,
                        width: 300,
                        fieldLabel: 'Agente Emisor:',
                        name: 'cmbAgente',
                        id: 'cmbAgente',
                        editable: false,
                        store: Ext.create('myapp.store.agente.AgenteStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                       
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'combobox',
                        x: 20,
                        y: 280,
                        width: 300,
                        fieldLabel: 'Alcance',
                        name: 'cmbAlcance',
                        id: 'cmbAlcance',
                        editable: false,
                        store: Ext.create('myapp.store.alcance.AlcanceStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                       
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'combobox',
                        x: 20,
                        y: 240,
                        width: 300,
                        fieldLabel: 'Sector:',
                        name: 'cmbSector',
                        id: 'cmbSector',
                        editable: false,
                        store: Ext.create('myapp.store.sector.SectorStore'),
                        valueField: 'id',
                        displayField: 'nombre',
                        emptyText: 'Seleccione',
                        queryMode: 'local',
                        allowBlank: false,
                       
                        triggerAction: 'all'
                    },
                    {
                        xtype: 'numberfield',
                        x: 20,
                        y: 320,
                        width: 300,
                        fieldLabel: 'Costo Asociado:',
                        name: 'txtPresupuesto'
                    },
                    {
                        xtype: 'datefield',
                        x: 20,
                        y: 390,
                        width: 300,
                        fieldLabel: 'Fecha del Evento:',
                        name: 'dtfFechaT',
                        format: 'Y-m-d',
                        minValue: new Date()
                    },
                    {
                        xtype: 'datefield',
                        x: 20,
                        y: 350,
                        width: 300,
                        fieldLabel: 'Fecha del Preaviso:',
                        name: 'dtfFechaPA',
                        format: 'Y-m-d',
                        minValue: new Date()
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 160,
                          cls:'x-btn-green',
                        name: 'btnNuevoAgente',
                        tooltip:'agregar Agente',
                        iconCls: 'agregarNuevo',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 200,
                         cls:'x-btn-green',
                       name: 'btnNuevoTipoEvento',
                       tooltip:'agregar Tipo de Evento',
                        iconCls: 'agregarNuevo',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 240,
                          cls:'x-btn-green',
                        name: 'btnNuevoSector',
                        tooltip:'agregar Sector',
                        iconCls: 'agregarNuevo',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 280,
                         cls:'x-btn-green',
                        name: 'btnNuevoAlcance',
                        tooltip:'agregar Alcance',
                        cls:'x-btn-green',
                        iconCls: 'agregarNuevo',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 360,
                        y: 160,
                         cls:'x-btn-green',
                        name: 'btnEditarAgente',
                        tooltip:'editar el agente seleccionado',
                        iconCls: 'useredit',
                        text: ''
                    },
                     {
                        xtype: 'button',
                        x: 360,
                        y: 200,
                          cls:'x-btn-green',
                        name: 'btnEditarTipoEvento',
                        tooltip:'editar el tipo de evento seleccionado',
                        iconCls: 'useredit',
                        text: ''
                    },   {
                        xtype: 'button',
                        x: 360,
                        y: 240,
                          cls:'x-btn-green',
                        name: 'btnEditarSector',
                        iconCls: 'useredit',
                        tooltip:'editar el sector seleccionado',
                        text: ''
                    },{
                        xtype: 'button',
                        x: 360,
                        y: 280,
                          cls:'x-btn-green',
                        name: 'btnEditarAlcance',
                        tooltip:'editar el alcance seleccionado',
                        iconCls: 'useredit',
                        text: ''
                    }
                  
                   



                ]// fin del contenedor
            }
        ]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                flex: 1,
                dock: 'bottom',
                height: 40,
                width: '100%',
                items: [{
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        iconCls: 'save',
                        name: 'btnGuardar',
                        // itemId: 'addAvance', 
                        text: 'Guardar',
                        disabled: false,
                        //formBind: true,
                        scope: this,
                    }, {
                        xtype: 'button',
                        iconCls: 'icon-limpiar',
                        name: 'btnLimpiar',
                        text: 'Limpiar'
                    } ]

            }]
    }
});