Ext.define('myapp.view.actividad.ActividadForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.actividadForm',
    itemId: 'actividadForm',
    requires: ['Ext.form.*'],
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        var me = this;
        me.items = me.buildItem();
        me.callParent();
    },
    buildItem: function () {
        return [
            {
                xtype: 'container',
                x: -10,
                y: -3,
                height: 260,
                width: 560,
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        x: 20,
                        y: 10,
                        height: 130,
                        width: 517,
                        layout: 'absolute',
                        title: '',
                        items: [
                            {
                                xtype: 'textareafield',
                                x: 10,
                                y: 10,
                                width: 470,
                                allowBlank :false,
                                minLength:5,
                                maxLength: 95,
                                fieldLabel: 'Descripción (*):',
                                name:'descripcion'
                            },
                            {
                                xtype: 'datefield',
                                x: 10,
                                y: 90,
                                width: 220,
                                fieldLabel: 'Fecha Tope',
                                name:'dtfFechaT',
                                format:'Y-m-d',
                                minValue: new Date(), //<-- min date is today
                                value:new Date()
                                
                               
                            },
                            {
                                xtype: 'datefield',
                                x: 260,
                                y: 80,
                                width: 220,
                                fieldLabel: 'Fecha de Preaviso:',
                                name:'dtfFechaPA',
                                format:'Y-m-d',
                                minValue: new Date(), //<-- min date is today
                                value:new Date()
                            }
                        ]
                    }, {
                        xtype: 'fieldset',
                        x: 20,
                        y: 150,
                        height: 80,
                        width: 517,
                        layout: 'absolute',
                        title: '',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                x: 10,
                                y: 10,
                          
                                fieldLabel: 'Esta actividad depende de otra para iniciar?',
                                boxLabel: 'Si',
                                name:'cbfDepende'
                            },
                            {
                                xtype: 'combobox',
                                x: 200,
                                y: 10,
                                fieldLabel: 'Actividad:',
                                name:'cmbActividadDepende',
                                editable      : false,
                                store         : Ext.create('myapp.store.actividad.ActividadDependienteStore'),
                                valueField    : 'id',
                                displayField  : 'descripcion',
                                emptyText     :'Seleccione',
                                queryMode     : 'local',
                                disabled       :true,
                                forceSelection: true,
                                triggerAction : 'all'
                                
                                
                            }
                        ]
                    }

                ]


            }]// el del Return
    },
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            height: 40,
            width: '100%',
            items: [{
                    xtype: 'tbfill'
                },  {
                    xtype: 'label',
                    iconCls: 'save',
                    name: 'btnGuardar',
                    x:100,
                    y:10,     
                    text: '(*)Dato Obligatorio',
                    disabled: false,
                    //formBind: true,
                    scope: this,
                },{
                    xtype: 'button',
                    iconCls: 'save',
                    name: 'btnGuardar',
                    // itemId: 'addAvance', 
                    text: 'Guardar',
                    disabled: false,
                    //formBind: true,
                    scope: this,
                },{
                    xtype: 'button',
                    iconCls: 'icon-limpiar',
                    name: 'btnLimpiar',
                    text: 'Limpiar'
                }
                
            ]
        }]

});









