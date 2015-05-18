var nuevo = false;
var nuevoS = false;
var nuevoTE = false;
var nuevoAg = false;
var nuevoAl = false;

Ext.define('myapp.controller.evento.EventoListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventos',
        'evento.WinEvento',
        'evento.Evento',
        'observacion.WinObservacionEvento',
        'maestroValor.WinMaestroTipoEvento',
        'maestroValor.WinMaestroAlcance',
        'maestroNombre.WinMaestroSector',
        'maestroNombre.WinMaestroAgente'
    ],
    requires: [
        'myapp.util.Util'
    ],
    refs: [
        {
            ref: 'ListaEventos',
            selector: 'listaEventos'
        },
        {
            ref: 'Evento',
            selector: 'evento'
        },
        {
            ref: 'WinEvento',
            selector: 'winEvento'
        },
        {
            ref: 'WinObservacionEvento',
            selector: 'winObservacionEvento'
        },
        {
            ref: 'WinMaestroAgente',
            selector: 'winMaestroAgente'
        },
        {
            ref: 'WinMaestroSector',
            selector: 'winMaestroSector'
        },
        {
            ref: 'WinMaestroTipoEvento',
            selector: 'winMaestroTipoEvento'
        },
        {
            ref: 'WinMaestroAlcance',
            selector: 'winMaestroAlcance'
        },
    ],
    init: function (application) {
        this.control({
            "listaEventos button[name=btnNuevo]": {
                click: this.onClickNuevoEvento
            },
            "listaEventos": {
                itemdblclick: this.onClickResumenEvento
            },
            "listaEventos button[name=btnEditar]": {
                click: this.onClickEditarEvento
            },
            "listaEventos button[name=btnCancelar]": {
                click: this.onClickCancelarEvento
            },
            "winEvento button[name=btnGuardar]": {
                click: this.onClickGuardarEvento
            },
            "winEvento button[name=btnNuevoAgente]": {
                click: this.onClickNuevoAgente
            },
            "winEvento button[name=btnNuevoTipoEvento]": {
                click: this.onClickNuevoTipoEvento
            },
            "winEvento button[name=btnNuevoAlcance]": {
                click: this.onClickNuevoAlcance
            },
            "winEvento button[name=btnNuevoSector]": {
                click: this.onClickNuevoSector
            },
            "winEvento button[name=btnEditarAgente]": {
                click: this.onClickEditarAgente
            },
            "winEvento button[name=btnEditarTipoEvento]": {
                click: this.onClickEditarTipoEvento
            },
            "winEvento button[name=btnEditarAlcance]": {
                click: this.onClickEditarAlcance
            },
            "winEvento button[name=btnEditarSector]": {
                click: this.onClickEditarSector
            },
            "winObservacionEvento button[name=btnGuardar]": {
                click: this.onClickGuardarObservacion
            },
            "winMaestroAlcance button[name=btnGuardar]": {
                click: this.onClickGuardarAlcance
            },
            "winMaestroAgente button[name=btnGuardar]": {
                click: this.onClickGuardarAgente
            },
            "winMaestroSector button[name=btnGuardar]": {
                click: this.onClickGuardarSector
            },
            "winMaestroTipoEvento button[name=btnGuardar]": {
                click: this.onClickGuardarTipoEvento
            },
        });
    },
    //==============Funciones de la Lista =====================================
    onClickNuevoEvento: function (button, e, options) {
        nuevo = true;
        var win = Ext.create('myapp.view.evento.WinEvento');
        win.setTitle("Nuevo Evento");
        win.show();

    }, // fin de la function

    onClickResumenEvento: function (button, e, options) {

        var grid = this.getListaEventos();
        record = grid.getSelectionModel().getSelection();

        var win = Ext.create('myapp.view.evento.WinEventoCompleto');
        win.setTitle("Resumen Evento " + record[0].get('titulo'));
        win.down('textfield[name=titulo]').setValue(record[0].get('titulo'));
        win.down('textareafield[name=descripcion]').setValue(record[0].get('descripcion'));
        win.down('textfield[name=fecha]').setValue(record[0].get('fechaEvento'));
        win.down('textfield[name=sector]').setValue(record[0].get('sector'));
        win.down('textfield[name=alcance]').setValue(record[0].get('alcance'));
        win.down('textfield[name=agente]').setValue(record[0].get('agente'));
        win.down('textfield[name=tipoEvento]').setValue(record[0].get('tipoEvento'));
        win.down('textfield[name=estatus]').setValue(record[0].get('estatus'));

        // cargar las grid de lineamientos
        store = win.down('gridpanel[name=gridLineamiento]').getStore();
        store.proxy.extraParams.id = record[0].get('idEv');
        store.load();

        // cargar las grid de la Reincidencia
        store1 = win.down('gridpanel[name=gridReincidencia]').getStore();
        store1.proxy.extraParams.id = record[0].get('idEv');
        store1.load();

        // cargar las grid de Comisionado  
        store2 = win.down('gridpanel[name=gridComisionado]').getStore();
        store2.proxy.extraParams.id = record[0].get('idEv');
        store2.load();

        // cargar las grid de Comisionado  

        store3 = win.down('gridpanel[name=gridPlanDeAccion]').getStore();
        store3.proxy.extraParams.id = record[0].get('idEv');

        store3.load();
        win.down('textfield[name=responsable]').setValue(record[0].get('nombrecompleto'));
        win.show();


    }, // fin de la function


    onClickEditarEvento: function (button, e, options) {
        nuevo = false;
        var grid = this.getListaEventos();
        record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            if (record[0].get('estatus') != 'Completado') {
                var win = Ext.create('myapp.view.evento.WinEvento');
                win.down('textfield[name=txtTitulo]').setValue(record[0].get('titulo'));
                win.down('textfield[name=txtDescripcion]').setValue(record[0].get('descripcion'));
                //win.down('combobox[name=cmbAgente]').setDisplay(record[0].get('agente'));
                //win.down('combobox[name=cmbAlcnace]').setValue(record[0].get('alcance'));
                //win.down('combobox[name=cmbSector]').setValue(record[0].get('sector'));
                //win.down('combobox[name=cmbTipoEvento]').setValue(record[0].get('tipoEvento'));
                win.down('datefield[name=dtfFechaT]').setValue(record[0].get('fechaEvento'));
                win.down('datefield[name=dtfFechaPA]').setValue(record[0].get('fechaPreAviso'));
                win.down('numberfield[name=txtPresupuesto]').setValue(record[0].get('presupuesto'));
                win.setTitle("Actualizar Evento");
                win.show();

            } else {
                Ext.MessageBox.show({title: 'Informaci&oacute;n',
                    msg: 'El evento no se puede editar porque ya ha finalizado',
                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
            }
        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el evento que desea Editar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }

    },
    onClickCancelarEvento: function (button, e, options) {

        var grid = this.getListaEventos();
        record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            if (record[0].get('estatus')== '<font color=#2E9AFE> Pendiente </font>'
               || record[0].get('estatus')== '<font color=#FF8000> En Ejecución  </font>'
               || record[0].get('estatus')== '<font color=#FF0000> Sin Plan </font>') {
                Ext.Msg.show({
                    title: 'Confirmar',
                    msg: 'Esta seguro que desea CANCELAR el Evento ' + record[0].get('titulo') + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (buttonId) {
                        if (buttonId == 'yes') {
                            var win = Ext.create('myapp.view.observacion.WinObservacionEvento');
                            win.setTitle("Cancelar Evento  " + record[0].get('titulo'));
                            win.down('label[name=lblDescripcion]').setText("Indique la razón por la que desea cancelar el Evento" + record[0].get('titulo') + "?");
                            win.show();
                        }
                    }
                });
            }
            else {
                Ext.MessageBox.show({title: 'Informaci&oacute;n',
                    msg: "El Evento "+ record[0].get('titulo') +" no lo puede cancelar, porque ha sido: "+record[0].get('estatus'),
                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
            }


        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el evento que desea Cancelar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
    },
    //==============Funciones de la ventana Evento=====================================

    onClickGuardarEvento: function (button, e, options) {
        formulario = this.getEvento();
        grid = this.getListaEventos();
        win = this.getWinEvento();

        if (nuevo) {
            var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
            loadingMask.show();

            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'evento/evento/registrarEvento',
                method: 'POST',
                params: {
                    txtTitulo: win.down('textfield[name=txtTitulo]').getValue(),
                    txtDescripcion: win.down('textfield[name=txtDescripcion]').getValue(),
                    txtPresupuesto: win.down('textfield[name=txtPresupuesto]').getValue(),
                    cmbAgente: win.down('combobox[name=cmbAgente]').getValue(),
                    cmbAlcance: win.down('combobox[name=cmbAlcance]').getValue(),
                    cmbSector: win.down('combobox[name=cmbSector]').getValue(),
                    cmbTipoEvento: win.down('combobox[name=cmbTipoEvento]').getValue(),
                    dtfFechaT: win.down('datefield[name=dtfFechaT]').getValue(),
                    dtfFechaPA: win.down('datefield[name=dtfFechaPA]').getValue(),
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
            var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
            loadingMask.show();
            record = grid.getSelectionModel().getSelection();
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'evento/evento/actualizarEvento',
                method: 'POST',
                params: {
                    txtIdEvento: record[0].get('idEv'),
                    txtTitulo: win.down('textfield[name=txtTitulo]').getValue(),
                    txtDescripcion: win.down('textfield[name=txtDescripcion]').getValue(),
                    txtPresupuesto: win.down('textfield[name=txtPresupuesto]').getValue(),
                    cmbAgente: win.down('combobox[name=cmbAgente]').getValue(),
                    cmbAlcance: win.down('combobox[name=cmbAlcance]').getValue(),
                    cmbSector: win.down('combobox[name=cmbSector]').getValue(),
                    cmbTipoEvento: win.down('combobox[name=cmbTipoEvento]').getValue(),
                    dtfFechaT: win.down('datefield[name=dtfFechaT]').getValue(),
                    dtfFechaPA: win.down('datefield[name=dtfFechaPA]').getValue(),
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

    }, // fin de la function 

    //============================MAESTROS===============================================
    onClickNuevoAgente: function (button, e, options) {
        nuevoAg = true;
        var winAgente = Ext.create('myapp.view.maestroNombre.WinMaestroAgente');
        winAgente.setTitle("Nuevo  Agente");
        winAgente.show();
    },
    onClickNuevoAlcance: function (button, e, options) {
        nuevoAl = true;
        var winAlcance = Ext.create('myapp.view.maestroValor.WinMaestroAlcance');
        winAlcance.setTitle("Nuevo  Alcance");
        winAlcance.show();
    },
    onClickNuevoSector: function (button, e, options) {
        nuevoS = true;
        var winSector = Ext.create('myapp.view.maestroNombre.WinMaestroSector');
        winSector.setTitle("Nuevo  Sector");
        winSector.show();
    },
    onClickNuevoTipoEvento: function (button, e, options) {
        nuevoTE = true;
        var winTE = Ext.create('myapp.view.maestroValor.WinMaestroTipoEvento');
        winTE.setTitle("Nuevo  Tipo de Evento");
        winTE.show();
    },
    onClickEditarAgente: function (button, e, options) {
        nuevoAg = false;
        winE = this.getWinEvento();
        var winAgente = Ext.create('myapp.view.maestroNombre.WinMaestroAgente');
        winAgente.setTitle("Actualizar  Agente");
        storeS = winE.down("combobox[name=cmbAgente]").getStore();
        valor = winE.down("combobox[name=cmbAgente]").getValue();

        for (i = 0; i < storeS.data.items.length; ++i)
        {

            if (storeS.data.items[i].data['id'] == valor) {
                winAgente.down("textfield[name=nombre]").setValue(storeS.data.items[i].data['nombre']);
                i = storeS.data.items.length + 1;
            }
        }
        winAgente.show();
    },
    onClickEditarTipoEvento: function (button, e, options) {
        nuevoTE = false;
        winE = this.getWinEvento();
        var winTE = Ext.create('myapp.view.maestroValor.WinMaestroTipoEvento');
        winTE.setTitle("Actualizar  Tipo de Evento");
        storeS = winE.down("combobox[name=cmbTipoEvento]").getStore();
        valor = winE.down("combobox[name=cmbTipoEvento]").getValue();

        for (i = 0; i < storeS.data.items.length; ++i)
        {
            console.log(storeS.data.items[i]);
            if (storeS.data.items[i].data['id'] == valor) {
                winTE.down("textfield[name=nombre]").setValue(storeS.data.items[i].data['nombre']);
                winTE.down("textfield[name=valor]").setValue(storeS.data.items[i].data['valor']);
                i = storeS.data.items.length + 1;
            }
        }
        winTE.show();
    },
    onClickEditarSector: function (button, e, options) {
        nuevoS = false;
        winE = this.getWinEvento();
        var winSector = Ext.create('myapp.view.maestroNombre.WinMaestroSector');
        winSector.setTitle("Actualizar  Sector");
        storeS = winE.down("combobox[name=cmbSector]").getStore();
        valor = winE.down("combobox[name=cmbSector]").getValue();

        for (i = 0; i < storeS.data.items.length; ++i)
        {

            if (storeS.data.items[i].data['id'] == valor) {
                winSector.down("textfield[name=nombre]").setValue(storeS.data.items[i].data['nombre']);
                i = storeS.data.items.length + 1;
            }
        }




        winSector.show();
    },
    onClickEditarAlcance: function (button, e, options) {
        nuevoAl = false;
        winE = this.getWinEvento();
        var winAlcance = Ext.create('myapp.view.maestroValor.WinMaestroAlcance');
        winAlcance.setTitle("Actualizar  Alcance");
        storeS = winE.down("combobox[name=cmbAlcance]").getStore();
        valor = winE.down("combobox[name=cmbAlcance]").getValue();

        for (i = 0; i < storeS.data.items.length; ++i)
        {

            if (storeS.data.items[i].data['id'] == valor) {
                winAlcance.down("textfield[name=nombre]").setValue(storeS.data.items[i].data['nombre']);
                winAlcance.down("textfield[name=valor]").setValue(storeS.data.items[i].data['valor']);
                i = storeS.data.items.length + 1;
            }
        }
        winAlcance.show();
    },
    //======================Funciones de la ventana Observaciones ====================0
    onClickGuardarObservacion: function (button, e, options) {

        grid = this.getListaEventos();
        winO = this.getWinObservacionEvento();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid.getSelectionModel().getSelection();

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'evento/evento/cancelarEvento',
            method: 'POST',
            params: {
                observacion: winO.down("textfield[name=txtDescripcion]").getValue(),
                idEvento: record[0].get('idEv')
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
    //==============================Maestros=======================================
    onClickGuardarAgente: function (button, e, options) {
        winE = this.getWinEvento();
        storeE = winE.down("combobox[name=cmbAgente]").getStore();
        winO = this.getWinMaestroAgente();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        if (nuevoAg) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'agente/agente/registrarAgente',
                method: 'POST',
                params: {
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }
        else {

            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'agente/agente/actualizarAgente',
                method: 'POST',
                params: {
                    id: winE.down("combobox[name=cmbAgente]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }



    },
    onClickGuardarSector: function (button, e, options) {
        winE = this.getWinEvento();
        storeE = winE.down("combobox[name=cmbSector]").getStore();
        winO = this.getWinMaestroSector();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        if (nuevoS) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'sector/sector/registrarSector',
                method: 'POST',
                params: {
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }
        else {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'sector/sector/actualizarSector',
                method: 'POST',
                params: {
                    id: winE.down("combobox[name=cmbSector]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }

    },
    onClickGuardarTipoEvento: function (button, e, options) {
        winE = this.getWinEvento();
        storeE = winE.down("combobox[name=cmbTipoEvento]").getStore();
        winO = this.getWinMaestroTipoEvento();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        if (nuevoTE) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'tipoEvento/tipoEvento/registrarTipoEvento',
                method: 'POST',
                params: {
                    txtValor: winO.down("textfield[name=valor]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }
        else {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'tipoEvento/tipoEvento/actualizarTipoEvento',
                method: 'POST',
                params: {
                    id: winE.down("combobox[name=cmbTipoEvento]").getValue(),
                    txtValor: winO.down("textfield[name=valor]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }

    },
    onClickGuardarAlcance: function (button, e, options) {
        winE = this.getWinEvento();
        storeE = winE.down("combobox[name=cmbAlcance]").getStore();
        winO = this.getWinMaestroAlcance();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        if (nuevoAl) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'alcance/alcance/registrarAlcance',
                method: 'POST',
                params: {
                    txtValor: winO.down("textfield[name=valor]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }
        else {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'alcance/alcance/actualizarAlcance',
                method: 'POST',
                params: {
                    id: winE.down("combobox[name=cmbAlcance]").getValue(),
                    txtValor: winO.down("textfield[name=valor]").getValue(),
                    txtNombre: winO.down("textfield[name=nombre]").getValue(),
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    if (result.success) {

                        storeE.load();
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
        }

    },
});