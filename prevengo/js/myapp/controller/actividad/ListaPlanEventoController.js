var nuevoPlan = false;

Ext.define('myapp.controller.actividad.ListaPlanEventoController', {
    extend: 'Ext.app.Controller',
    views: ['actividad.ListaPlanEvento',
        'actividad.ActividadForm',
        'actividad.WinActividad',
    ],
    requires: [
        'myapp.util.Util'
    ],
    refs: [
        {
            ref: 'ListaPlanEvento',
            selector: 'listaPlanEvento'
        },
        {
            ref: 'ActividadForm',
            selector: 'actividadForm'
        },
        {
            ref: 'WinActividad',
            selector: 'winActividad'
        },
        {
            ref: 'WinObservacionActividad',
            selector: 'winObservacionActividad'
        }

    ],
    init: function (application) {
        this.control({
            "listaPlanEvento button[name=btnNuevoPlan]": {
                click: this.onClickNuevoPlan
            },
            "listaPlanEvento button[name=btnEditarPlan]": {
                click: this.onClickEditarPlan
            },
            "listaPlanEvento button[name=btnCancelarPlan]": {
                click: this.onClickCancelarPlan
            },
            "winActividad button[name=btnGuardar]": {
                click: this.onClickGuardarPlan
            },
            "winActividad checkboxfield[name=cbfDepende]": {
                change: this.cargarActividad
            },
            "winObservacionActividad button[name=btnGuardar]": {
                click: this.onClickGuardarObservacionCancelar
            },
        });
    },
//=======================Funciones de la ListaPlanEvento=========================================

    onClickNuevoPlan: function (button, e, options) {
        nuevoPlan = true;
        var win = Ext.create('myapp.view.actividad.WinActividad');
        var winAF = Ext.create('myapp.view.actividad.ActividadForm');
        win.setTitle("Nueva Actividad");
        win.show();

    }, // fin de la function

    onClickEditarPlan: function (button, e, options) {
        nuevoPlan = false;
        var grid = this.getListaPlanEvento(),
                record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            var editWindow = Ext.create('myapp.view.actividad.WinActividad');
            editWindow.setTitle("Actualizar Actividad");
            editWindow.down('textfield[name=descripcion]').setValue(record[0].get('descripcion'));
            editWindow.down('textfield[name=dtfFechaT]').setValue(record[0].get('fecha'));
            editWindow.down('textfield[name=dtfFechaPA]').setValue(record[0].get('fechaPA'));

            editWindow.down('combobox[name=dependiente]').setValue("Bienvenido");
            editWindow.show();
        }
        else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el evento que desea editar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
    }, // fin de la function


    onClickCancelarPlan: function (button, e, options) {
        var grid = this.getListaPlanEvento();
        record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            if (record[0].get('estatus') == 'Sin Iniciar'
                    || record[0].get('estatus') == 'En Ejecución'
                    || record[0].get('estatus') == 'Sin Plan') {
                Ext.Msg.show({
                    title: 'Confirmar',
                    msg: 'Esta seguro que desea CANCELAR el Evento ' + record[0].get('descripcion') + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (buttonId) {
                        if (buttonId == 'yes') {
                            var win = Ext.create('myapp.view.observacion.WinObservacionActividad');
                            win.setTitle("Cancelar la actividad " + record[0].get('descripcion'));
                            win.down('label[name=lblDescripcion]').setText("Indique la razón por la que desea cancelar el plan de accción  " + record[0].get('descripcion') + "?");
                            win.show();
                        }
                    }
                });
            }
            else {
                Ext.MessageBox.show({title: 'Informaci&oacute;n',
                    msg: "El Evento " + record[0].get('descripcion') + " no lo puede cancelar, porque ha sido: " + record[0].get('estatus'),
                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
            }


        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar la actividad que desea cancelar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }

    },
//=======================Funciones del WinActividad=========================================
    onClickGuardarPlan: function (button, e, options) {

        win = this.getWinActividad();
        grid = this.getListaPlanEvento();



        if (win.down("textfield[name=descripcion]").getValue() == '') {
            Ext.MessageBox.show({title: 'Alerta', msg: "Ingrese la descripcion del plan", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
        }
        else {
            if (nuevoPlan) {
                var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
                loadingMask.show();
                Ext.Ajax.request({//AQUI ENVIO LA DATA 
                    url: BASE_URL + 'actividad/actividad/registrarActividad',
                    method: 'POST',
                    params:
                            {
                                txtDescripcion: win.down("textfield[name=descripcion]").getValue(),
                                dtfFechaT: win.down("textfield[name=dtfFechaT]").getValue(),
                                dtfFechaPA: win.down("textfield[name=dtfFechaPA]").getValue(),
                                cmbActividadDepende: win.down("combobox[name=cmbActividadDepende]").getValue(),
                                lblIdEvent: grid.down("label[name=lblIdEvento]").getEl().dom.textContent,
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
                        Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    }

                });
            }
            else
            {
                record = grid.getSelectionModel().getSelection();
                Ext.Ajax.request({//AQUI ENVIO LA DATA 
                    url: BASE_URL + 'actividad/actividad/actualizarActividad',
                    method: 'POST',
                    params:
                            {
                                id: record[0].get('id'),
                                txtDescripcion: win.down("textfield[name=descripcion]").getValue(),
                                dtfFechaT: win.down("textfield[name=dtfFechaT]").getValue(),
                                dtfFechaPA: win.down("textfield[name=dtfFechaPA]").getValue(),
                                cmbActividadDepende: win.down("combobox[name=cmbActividadDepende]").getValue(),
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
                        Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    }

                });
            }
        }



    }, // fin de la function




    cargarActividad: function () {
        nuevo = this.getListaPlanEvento();
        evento = nuevo.down("label[name=lblIdEvento]").getEl().dom.textContent;
        if (nuevoPlan) {
            if (Ext.ComponentQuery.query('winActividad checkboxfield[name=cbfDepende]')[0].getValue() == true) {
                Ext.ComponentQuery.query('winActividad combobox[name=cmbActividadDepende]')[0].setDisabled(false);
                store = Ext.ComponentQuery.query('winActividad  combobox[name=cmbActividadDepende]')[0].getStore();
                store.proxy.extraParams.idEvent = evento;
                store.proxy.extraParams.idAct = 0;
                store.load();

            } else {
                Ext.ComponentQuery.query('winActividad combobox[name=cmbActividadDepende]')[0].setDisabled(true);
            }
        } else {
            record = nuevo.getSelectionModel().getSelection();
            if (Ext.ComponentQuery.query('winActividad  checkboxfield[name=cbfDepende]')[0].getValue() == true) {
                Ext.ComponentQuery.query('winActividad  combobox[name=cmbActividadDepende]')[0].setDisabled(false);

                store = Ext.ComponentQuery.query('winActividad combobox[name=cmbActividadDepende]')[0].getStore();
                store.proxy.extraParams.idEvent = evento;
                store.proxy.extraParams.idAct = record[0].get('id');
                store.load();



            } else {
                Ext.ComponentQuery.query('winActividad combobox[name=cmbActividadDepende]')[0].setDisabled(true);
            }
        }
    },
    //======================Funciones de la ventana Observaciones ====================0
    onClickGuardarObservacionCancelar: function (button, e, options) {

        grid = this.getListaPlanEvento();
        winO = this.getWinObservacionActividad();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid.getSelectionModel().getSelection();

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'actividad/actividad/cancelarActividad',
            method: 'POST',
            params: {
                observacion: winO.down("textfield[name=txtDescripcion]").getValue(),
                idActividad: record[0].get('id')
            },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                loadingMask.hide();

                if (result.success) {
                    grid.getView().refresh();
                    grid.getStore().load();
                    winO.close();
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                }
                else {
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    // myapp.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function (form, action) {
                var result = action.result;
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });


    },
});
