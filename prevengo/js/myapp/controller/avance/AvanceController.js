var nuevo = false;
Ext.define('myapp.controller.avance.AvanceController', {
    extend: 'Ext.app.Controller',
    views: ['avance.Avance',
        'avance.GridListaAvance',
        'avance.Gridbuscar',
    ],
    requires: [
        'myapp.util.Util'
    ],
    refs: [
        {
            ref: 'Avance',
            selector: '#formAvance'
        },
        {
            ref: 'GridListaAvance',
            selector: '#gridListaAvance'
        },
        {
            ref: 'WinObservacionAvanceRechazad',
            selector: 'winObservacionAvanceRechazad'
        },
        {
            ref: 'Gridbuscar',
            selector: '#gridbuscar'
        }

    ],
    init: function (application) {
        this.control({
            "#formAvance button[name=btnGuardar]": {
                click: this.onClickguardarAvance
            },
            "#formAvance button[name=btnCancelar]": {
                click: this.onClickLimpiarAvance
            },
            "#formAvance button[name=btnLimpiar]": {
                click: this.onClickLimpiarAvance
            },
            "#formAvance combobox[name=cmbActividad]": {
                change: this.cambiarFecha
            },
            "#gridListaAvance button[name=btnAgregarAvance]": {
                click: this.onClickAgregarAvance
            },
            "#gridListaAvance button[name=btnEditarAvance]": {
                click: this.onClickEditarAvance
            },
            "#gridListaAvance": {
                itemdblclick: this.onClickVerObservacion
            },
             "#formAvance radiogroup[name=rdgAgregarAnexo]": {
                change: this.changeRadio
            },
             "#formAvance radiogroup[name=rdgTipoAnexo]": {
                change: this.changeTipoAnexo
            },
        });
    },
    //===================== Funciones de la Lista===============================
    onClickAgregarAvance: function (button, e, options) {


        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'avance/avance/buscarAvance',
            method: 'POST',
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                if (result.cuanto == 0) {

                    Ext.MessageBox.show({title: 'Mensaje', msg: "No tiene actividades pendientes", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }
                else {
                    var win = Ext.create('myapp.view.avance.Gridbuscar');
                    win.setTitle("Nuevo Avance");
                     win.down('button[name=btnGuardar]').setVisible(false);
                    nuevo = true;
                    win.show();
                }


            },
            failure: function (form, action) {
                var result = action.result;

                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });
    },
    onClickEditarAvance: function (button, e, options) {

        formulario = this.getAvance();
        grid = this.getGridListaAvance();
        win = this.getGridbuscar();

        record = grid.getSelectionModel().getSelection();
        if (record[0]) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'avance/avance/buscarUsuario',
                method: 'POST',
                params: {idUsuario: record[0].get('idUs'), },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);

                    if (result.cuanto == 0) {

                        Ext.MessageBox.show({title: 'Mensaje', msg: "No tiene privilgios para editar este avance", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    }
                    else {
                        var win = Ext.create('myapp.view.avance.Gridbuscar');
                        win.setTitle("Actualizar Avance");
                        win.down('textfield[name=txtDescripcion]').setValue(record[0].get('descripcion'));
                        win.down('combobox[name=cmbTipoAvance]').setValue(record[0].get('tipo'));
                        win.down('combobox[name=cmbActividad]').setValue(record[0].get('actividadTitle'));
                        win.down('label[name=lblNombreEvento]').setText(record[0].get('evento'));
                        win.down('label[name=lblFechaAsignacion]').setText(record[0].get('fechaAsignacion'));
                        win.down('numberfield[name=txtCosto]').setValue(record[0].get('costo'));

                        nuevo = false;
                        win.show();
                    }
                },
                failure: function (form, action) {
                    var result = action.result;

                    Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                }
            });
        }
        else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar por el Avance que desea editar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }


    },
    //===================== Funciones del formulario===============================
    onClickguardarAvance: function (button, e, options) {
        formulario = this.getAvance();
        grid = this.getGridListaAvance();
        win = this.getGridbuscar();
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();
        if (nuevo) {
            formulario.getForm().submit({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'avance/avance/registrarAvance',
                method: 'POST',
                params: formulario.getForm().getValues(),
                success: function (form, action) {
                    var result = action.result;
                    loadingMask.hide();

                    if (result.success) {
                        grid.getView().refresh();
                        grid.getStore().load();
                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        win.close();
                    }
                    else {
                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        // myapp.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function (form, action) {
                    var result = action.result;
                    loadingMask.hide();
                    Ext.MessageBox.show({title: 'Alerta', msg: "Ocurrio un error. Por favor verifique los datos", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }
            });
        } else {
            record = grid.getSelectionModel().getSelection();

            if (formulario.down('combobox[name=cmbActividad]').getValue() != record[0].get('actividadTitle')) {
                act = formulario.down('combobox[name=cmbActividad]').getValue();
            } else
            {
                act = record[0].get('idAct');
            }

            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'avance/avance/actualizarAvance',
                method: 'POST',
                params: {
                    idAvance: record[0].get('idAv'),
                    cmbActividad: act,
                    cmbTipoAvance: formulario.down('combobox[name=cmbTipoAvance]').getValue(),
                    txtCosto: formulario.down('numberfield[name=txtCosto]').getValue(),
                    txtDescripcion: formulario.down('textfield[name=txtDescripcion]').getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();

                    if (result.success) {
                        grid.getView().refresh();
                        grid.getStore().load();
                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        win.close();
                    }
                    else {
                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        // myapp.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function (form, action) {
                    var result = action.result;

                    loadingMask.hide();
                    Ext.MessageBox.show({title: 'Alerta', msg: "Ocurrio un error. Por favor verifique los datos", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }
            });

        }

    }, // fin de la function 


    onClickLimpiarAvance: function (form) {
        formulario = this.getAvance();
        formulario.getForm().reset();

    }, // fin de la function 

    cambiarFecha: function (form) {
        formulario = this.getAvance();
        storeAct = formulario.down("combobox[name=cmbActividad]").getStore();
        valor = formulario.down("combobox[name=cmbActividad]").getValue();

        for (i = 0; i < storeAct.data.items.length; ++i)
        {
            if (storeAct.data.items[i].data['id'] == valor) {
                formulario.down("label[name=lblFechaAsignacion]").setText(storeAct.data.items[i].data['fecha']);
                formulario.down("label[name=lblNombreEvento]").setText(storeAct.data.items[i].data['evento']);
                i = length + 1;
            }

        }


    },
    onClickVerObservacion: function (record, item, index, e, eOpts) {
        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'avance/avance/buscarUsuario',
            method: 'POST',
            params: {idUsuario:item.data.idUs },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);

                if (result.cuanto == 0) {

                    Ext.MessageBox.show({title: 'Mensaje', msg: "No tiene privilegios para esta acción.", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }
                else {
                if (item.data.estatus == 'Rechazado') {
                    
                    
                    var win = Ext.create('myapp.view.observacion.WinObservacionAvanceRechazad');
                    win.setTitle("Observacion: ");
                    win.down("label[name=lblDescripcion]").setText('Su avance ha sido rechazado.');
                    win.down("textareafield[name=txtDescripcion]").setValue(item.data.observacion);
                    win.show();
                } else
                {
                    Ext.MessageBox.show({title: 'Mensaje', msg: "No tiene observaciones.", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                }
              }
                
            },
            failure: function (form, action) {
                var result = action.result;

                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });







    },
     changeRadio: function (grupo, cmp) {
        win = this.getAvance();
        win1= this.getGridbuscar();
        if (cmp.seleccionAgregar == 1)
        {
            win1.setHeight(550);
            win.down('button[name=btnGuardar]').setVisible(false);
            win.down('fieldset[name=formAnexo]').setVisible(true);
            win.down('textfield[name=txtDireccion]').setVisible(false);
            win.down('filefield[name=txtArchivo]').setVisible(false);
          
        }
        else {
            win.down('button[name=btnGuardar]').setVisible(true);
            win.down('fieldset[name=formAnexo]').setVisible(false);
            win1.setHeight(440);
        }
    },
    
        changeTipoAnexo: function (grupo, cmp) {
        win = this.getAvance();
       
        if (cmp.seleccion == 1)
        {
           
            win.down('button[name=btnGuardar]').setVisible(true);
            win.down('textfield[name=txtDireccion]').setVisible(true);
            win.down('filefield[name=txtArchivo]').setVisible(false);
            win.down('textfield[name=txtSeleccion]').setValue(cmp.seleccion);
        }
        else {
            win.down('button[name=btnGuardar]').setVisible(true);
            win.down('textfield[name=txtDireccion]').setVisible(false);
            win.down('textfield[name=txtArchivo]').setVisible(true);
            win.down('textfield[name=txtSeleccion]').setValue(cmp.seleccion);
        }
    },
});