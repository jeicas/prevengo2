Ext.define('myapp.controller.consultar.ConsultarAutorizadosController', {
    extend: 'Ext.app.Controller',
    views: [
        'consultar.ConsultarAutorizados',
        'consultar.ConsultarAutorizadosLista',
        'registrar.EditarAutorizacion'
    ],
    refs: [{
        ref: 'ConsultarAutorizadosLista',
        selector: 'consultarautorizadosLista'
    },{
        ref: 'ConsultarAutorizados',
        selector: 'consultarautorizados'
    },{
        ref: 'EditarAutorizacion',
        selector: 'editarAutorizacion'
    }],
    init: function(application) {
        this.control({
            "consultarautorizadosLista actioncolumn#editarSeleccionado": {
                click: this.editarSeleccionado
            },
            'consultarautorizadosLista actioncolumn#eliminarSeleccionado':{
                click: this.eliminarSeleccionado
            },            
            "editarAutorizacion button[name=editar]": {
                click: this.editar
            },
            "editarAutorizacion combobox[name=tipo]": {
                change: this.cambioCombo
            },
            "editarAutorizacion timefield[name=horasalida]": {
                change: this.cambioHoras
            },
            "consultarautorizados button#buscarAutorizacion": {
                click: this.buscarAutorizados
            },
            "consultarautorizados button#limpiar": {
                click: this.limpiarCombos
            }
        }); 
    },
    limpiarCombos: function(){
        grid = this.getConsultarAutorizadosLista();
        formPanel = this.getConsultarAutorizados();
        formPanel.down("combobox[name=motivo]").reset();
        motivo=formPanel.down("combobox[name=motivo]").getValue();
        tipo=formPanel.down("combobox[name=tipo]").reset();
        formPanel.down("datefield[name=fechaDesde]").setValue(new Date());
        formPanel.down("datefield[name=fechaHasta]").setValue(new Date());
        fdesde= formPanel.down("datefield[name=fechaDesde]").getValue();
        fhasta= formPanel.down("datefield[name=fechaHasta]").getValue();
        desde=Ext.Date.format(fdesde, 'Y-m-d');
        hasta=Ext.Date.format(fhasta, 'Y-m-d'); 
        store= grid.getStore();
        store.proxy.extraParams.desde=desde;
        store.proxy.extraParams.hasta=hasta;
        grid.getView().refresh(true);
        store.load();      
    },
    buscarAutorizados: function(){
        formPanel = this.getConsultarAutorizados();
        grid = this.getConsultarAutorizadosLista();
        motivo= formPanel.down("combobox[name=motivo]").getValue();
        estado= formPanel.down("combobox[name=estado]").getValue();
        tipo= formPanel.down("combobox[name=tipo]").getValue();
        fdesde= formPanel.down("datefield[name=fechaDesde]").getValue();
        fhasta= formPanel.down("datefield[name=fechaHasta]").getValue();
        desde=Ext.Date.format(fdesde, 'Y-m-d');
        hasta=Ext.Date.format(fhasta, 'Y-m-d');        
        store= grid.getStore();
        store.proxy.extraParams.estado=estado;
        store.proxy.extraParams.motivo=motivo;
        store.proxy.extraParams.tipo=tipo;
        store.proxy.extraParams.desde=desde;
        store.proxy.extraParams.hasta=hasta;
        grid.getView().refresh(true);
        store.load();
    },
    cambioCombo: function(){        
        formPanel = this.getEditarAutorizacion();
        tipoautorizacion= formPanel.down("combobox[name=tipo]").getValue();
        if(tipoautorizacion=='1'){
            formPanel.down("timefield[name=horasalida]").reset();
            formPanel.down("timefield[name=horasalida]").setVisible(false);
            formPanel.down('timefield[name=horasalida]').allowBlank = true;
            formPanel.down('timefield[name=horasalida]').validateValue(formPanel.down('timefield[name=horasalida]').getValue());
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setVisible(true);
            formPanel.down('timefield[name=horaentrada]').allowBlank = false;
            formPanel.down('timefield[name=horaentrada]').validateValue(formPanel.down('timefield[name=horaentrada]').getValue());
            formPanel.down("textfield[name=placaVehiculo]").setValue('');
            formPanel.down("textfield[name=placaVehiculo]").setVisible(false);
            formPanel.down('textfield[name=placaVehiculo]').allowBlank = true;
            formPanel.down('textfield[name=placaVehiculo]').validateValue(formPanel.down('textfield[name=placaVehiculo]').getValue());
        }if(tipoautorizacion=='2'){
            formPanel.down("timefield[name=horasalida]").reset();
            formPanel.down("timefield[name=horasalida]").setVisible(true);
            formPanel.down('timefield[name=horasalida]').allowBlank = false;
            formPanel.down('timefield[name=horasalida]').validateValue(formPanel.down('timefield[name=horasalida]').getValue());
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setVisible(false);
            formPanel.down('timefield[name=horaentrada]').allowBlank = true;
            formPanel.down('timefield[name=horaentrada]').validateValue(formPanel.down('timefield[name=horaentrada]').getValue());
            formPanel.down("textfield[name=placaVehiculo]").setValue('');
            formPanel.down("textfield[name=placaVehiculo]").setVisible(false);
            formPanel.down('textfield[name=placaVehiculo]').allowBlank = true;
            formPanel.down('textfield[name=placaVehiculo]').validateValue(formPanel.down('textfield[name=placaVehiculo]').getValue());
        }if(tipoautorizacion=='3'){
            formPanel.down("timefield[name=horasalida]").reset();
            formPanel.down("timefield[name=horasalida]").setVisible(true);                        
            formPanel.down('timefield[name=horasalida]').allowBlank = false;
            formPanel.down('timefield[name=horasalida]').validateValue(formPanel.down('timefield[name=horasalida]').getValue());
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setVisible(true);                        
            formPanel.down('timefield[name=horaentrada]').allowBlank = false;
            formPanel.down('timefield[name=horaentrada]').validateValue(formPanel.down('timefield[name=horaentrada]').getValue());
            formPanel.down("textfield[name=placaVehiculo]").setValue('');
            formPanel.down("textfield[name=placaVehiculo]").setVisible(false);
            formPanel.down('textfield[name=placaVehiculo]').allowBlank = true;
            formPanel.down('textfield[name=placaVehiculo]').validateValue(formPanel.down('textfield[name=placaVehiculo]').getValue());
        }if(tipoautorizacion=='4'){
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setVisible(false);
            formPanel.down('timefield[name=horaentrada]').allowBlank = true;
            formPanel.down('timefield[name=horaentrada]').validateValue(formPanel.down('timefield[name=horaentrada]').getValue());
            formPanel.down("timefield[name=horasalida]").reset();
            formPanel.down("timefield[name=horasalida]").setVisible(true);
            formPanel.down('timefield[name=horasalida]').allowBlank = false;
            formPanel.down('timefield[name=horasalida]').validateValue(formPanel.down('timefield[name=horasalida]').getValue());
            formPanel.down("textfield[name=placaVehiculo]").setValue('');
            formPanel.down("textfield[name=placaVehiculo]").setVisible(true);
            formPanel.down('textfield[name=placaVehiculo]').allowBlank = false;
            formPanel.down('textfield[name=placaVehiculo]').validateValue(formPanel.down('textfield[name=placaVehiculo]').getValue());
        }if(tipoautorizacion=='5' || tipoautorizacion=='6' || tipoautorizacion=='7'){
            formPanel.down("timefield[name=horasalida]").reset();
            formPanel.down("timefield[name=horasalida]").setVisible(false);                        
            formPanel.down('timefield[name=horasalida]').allowBlank = true;
            formPanel.down('timefield[name=horasalida]').validateValue(formPanel.down('timefield[name=horasalida]').getValue());
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setVisible(false);                        
            formPanel.down('timefield[name=horaentrada]').allowBlank = true;
            formPanel.down('timefield[name=horaentrada]').validateValue(formPanel.down('timefield[name=horaentrada]').getValue());
            formPanel.down("textfield[name=placaVehiculo]").setValue('');
            formPanel.down("textfield[name=placaVehiculo]").setVisible(false);
            formPanel.down('textfield[name=placaVehiculo]').allowBlank = true;
            formPanel.down('textfield[name=placaVehiculo]').validateValue(formPanel.down('textfield[name=placaVehiculo]').getValue());
        }
    },
    editar: function(button) {        
        var win = button.up('window');
        formPanel = win.down('form');        
        if(formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                clientValidation: true,
                url: BASE_URL + 'registrar/autorizacion/editarAutorizacion',
                success: function(form, action) {
                    var result = action.result;
                    if(result.success){
                        Ext.Msg.alert( 'Información','Autorización actualizada exitosamente');
                        store.load();                        
                        formPanel.getForm().reset();
                        win.close();
                    }else{
                        Ext.Msg.alert( 'Verifique','No se pudo actualizar la autorización del empleado');
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Fallo', 'Los campos no pueden ser guardados con un valor invalido');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Error', action.result.msg);
                    }
                    win.close();
                }
            });
        }
    },
    cambioHoras: function(){
        formPanel = this.getEditarAutorizacion();
        hS=formPanel.down("timefield[name=horasalida]").getValue();
        hE=formPanel.down("timefield[name=horaentrada]").getValue();
        tipoautorizacion= formPanel.down("combobox[name=tipo]").getValue();
        if(tipoautorizacion=='3'){
            formPanel.down("timefield[name=horaentrada]").reset();
            formPanel.down("timefield[name=horaentrada]").setMinValue(hS);
        }
    },
    editarSeleccionado: function ( grid, record,rowIndex) {
        grid = this.getConsultarAutorizadosLista();
        me=this;
        store= grid.getStore();
        if (grid.store.data.items[rowIndex].data.estado=='Sin Procesar') {
            record= store.getAt(rowIndex);
            if(record){           
                var editWindow = Ext.create('myapp.view.registrar.EditarAutorizacion');
                editWindow.down('form').getForm().reset();
                editWindow.down('form').loadRecord(record);
                editWindow.down('textfield[name=cedula]').setReadOnly(true);
                editWindow.down('textfield[name=nacionalidad]').setReadOnly(true);
                editWindow.down('textfield[name=nombre]').setReadOnly(true);
                editWindow.down('textfield[name=apellido]').setReadOnly(true);
                editWindow.down('textfield[name=correo]').setReadOnly(true);
                editWindow.setTitle(record.get('name'));
                editWindow.show();
                me.cambioCombo();
            }
        }
    },
    eliminarSeleccionado: function( grid, record,rowIndex){
        grid = this.getConsultarAutorizadosLista(),
        formPanel = this.getConsultarAutorizados(),
        store= grid.getStore();        
        if (grid.store.data.items[rowIndex].data.fechaautorizacion >= Ext.Date.format( new Date, "d-m-Y" ) && grid.store.data.items[rowIndex].data.estado=='Sin Procesar') {
            seleccion= store.getAt(rowIndex);
            //console.log(grid.store.data.items[rowIndex].data.fechaautorizacion);
            var recordsToSend = [];
            Ext.each(seleccion, function(record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.encode(recordsToSend);
            Ext.MessageBox.confirm('Confirmar', '¿Desea eliminar la autorización del empleado seleccionado?',
                function(btn) {
                    if (btn === 'yes'){
                        Ext.Ajax.request({
                            method:'POST',
                            url : '../registrar/autorizacion/eliminarAutorizado',
                            params :{
                                records : recordsToSend
                            },
                            success : function(form,action) {
                                Ext.get(grid.getEl()).unmask();
                                info = Ext.JSON.decode(form.responseText);
                                if(info.success==true){
                                    store.remove(seleccion);
                                    grid.getView().refresh(true);
                                    grid.getStore().load();
                                }
                            }
                        });
                    }
                }
            );
        }
    }
});
