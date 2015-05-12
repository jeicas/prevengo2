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
                        forceSelection: true,
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
                        forceSelection: true,
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
                        forceSelection: true,
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
                        forceSelection: true,
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
                        name: 'btnNuevoAgente',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 200,
                        name: 'btnEditarAgente',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 240,
                        name: 'btnNuevoTipoEvento',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 330,
                        y: 280,
                        name: 'btnEditarTipoEvento',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 360,
                        y: 280,
                        name: 'btnNuevoSector',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                     {
                        xtype: 'button',
                        x: 360,
                        y: 240,
                        name: 'btnEditarSector',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 360,
                        y: 160,
                        name: 'btnNuevoAlcance',
                        iconCls: 'icon-limpiar',
                        text: ''
                    },
                    {
                        xtype: 'button',
                        x: 360,
                        y: 200,
                        name: 'btnEditarAlcance',
                        iconCls: 'icon-limpiar',
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