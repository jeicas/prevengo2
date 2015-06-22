var nuevo = false;
var nuevorespo = false;
var typeExtension = "image";

Ext.define('myapp.controller.evento.EventoReincidenciaListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventosReincidencia',
        'evento.WinReincidenciaEvento'


    ],
    requires: [
        'myapp.util.Util',
    ],
    refs: [
        {
            ref: 'ListaEventosReincidencia',
            selector: 'listaEventosReincidencia'
        },
        {
            ref: 'WinEventosReincidencia',
            selector: 'winEventosReincidencia'
        },
        {
            ref: 'ListaReincidenciaEvento',
            selector: 'listaReincidenciaEvento'
        },
        {
            ref: 'WinReincidenciaEvento',
            selector: 'winReincidenciaEvento'
        },
        {
            ref: 'WinReincidencia',
            selector: 'winReincidencia'
        },
        {
            ref: 'WinAnexo',
            selector: 'winAnexo'
        },
    ],
    init: function (application) {
        this.control({
            "listaEventosReincidencia": {
                itemdblclick: this.onClickVerReincidencia
            },
            "listaReincidenciaEvento button[name=btnNuevoReincidencia]": {
                click: this.onClickNuevoReincidencia
            },
            "listaReincidenciaEvento button[name=btnEliminarReincidencia]": {
                click: this.onClickEliminarReincidencia
            },
            "winReincidencia radiogroup[name=rdgAgregarAnexo]": {
                change: this.changeRadio
            },
            "winReincidencia button[name=btnGuardar]": {
                click: this.onClickGuardarReincidencia
            },
            "winReincidencia button[name=btnSubirArchivo]": {
                change: this.previewImage
            },
            "winAnexo radiogroup[name=rdgTipoAnexo]": {
                change: this.changeTipoAnexo
            },
        });
    },
    //==============Funciones de la listaEventosComisionados  =====================================
    onClickVerReincidencia: function (record, item, index, e, eOpts) {
        win = Ext.create('myapp.view.evento.WinReincidenciaEvento');
        newGrid2 = this.getListaReincidenciaEvento();

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'reincidencia/reincidencia/buscarReincidencia',
            method: 'POST',
            params: {
                id: item.data.idEv
            },
            success: function (result, request) {

                result = Ext.JSON.decode(result.responseText);
                if (result.cuanto == 0) {

                    if (item.data.estatus == 'Pendiente'
                            || item.data.estatus == 'En Ejecución'
                            || item.data.estatus == 'Sin Plan')
                    {

                        store = newGrid2.getStore();
                        store.proxy.extraParams.id = item.data.idEv;
                        store.load();
                        win.setTitle("Reincidencias del evento: " + item.data.titulo);

                        win.show();
                    }
                    Ext.MessageBox.show({title: 'Mensaje', msg: "No tiene Reincidencias registrados", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                }
                else {

                    if (item.data.estatus == 'Pendiente'
                            || item.data.estatus == 'En Ejecución'
                            || item.data.estatus == 'Sin Plan')
                    {

                        store = newGrid2.getStore();
                        store.proxy.extraParams.id = item.data.idEv;
                        store.load();
                        win.setTitle("Reincidencias del evento: " + item.data.titulo);
                        win.show();
                    } else {
                        store = newGrid2.getStore();
                        store.proxy.extraParams.id = item.data.idEv;
                        store.load();
                        newGrid2.down('button[name=btnNuevoReincidencia]').setVisible(false);
                        newGrid2.down('button[name=btnEliminarReincidencia]').setVisible(false);
                        win.setTitle("Reincidencias del Evento");
                        win.show();
                    }


                }

            },
            failure: function (form, action) {
                var result = action.result;

                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });

    }, // fin de la function
    // ====================funciones de la ventana listaComisionadoEvento================
    onClickNuevoReincidencia: function (button, e, options) {
        var grid = this.getListaEventosReincidencia();
        record = grid.getSelectionModel().getSelection();

        win = Ext.create('myapp.view.evento.WinReincidencia');
        win.setTitle("Nueva Reincidencia");
        win.down('button[name=btnGuardar]').setVisible(false);
         win.down('form[name=formAnexo]').setVisible(false);
        win.show();
    },
    onClickEliminarReincidencia: function (button, e, options) {
        var grid = this.getListaReincidenciaEvento();
        record = grid.getSelectionModel().getSelection();

        if (record[0]) {
            Ext.Msg.show({
                title: 'Confirmar',
                msg: 'Esta seguro que desea Eliminar la reincidecia?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId) {
                    if (buttonId == 'yes') {
                        Ext.Ajax.request({
                            url: BASE_URL + 'reincidencia/reincidencia/eliminarReincidencia',
                            method: 'POST',
                            params: {
                                id: record[0].get('idRein'),
                            },
                            success: function (result, request) {
                                data = Ext.JSON.decode(result.responseText);

                                if (data.success) {
                                    Ext.MessageBox.show({title: 'Mensaje', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                    grid.getView().refresh();
                                    grid.getStore().load();

                                }
                                else {
                                    Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                    // myapp.util.Util.showErrorMsg(result.msg);
                                }
                            },
                            failure: function (result, request) {
                                var result = Ext.JSON.decode(result.responseText);
                                loadingMask.hide();
                                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                            }
                        });
                    }
                }
            });

        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar la reincidencia que desea eliminar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
    },
    // ====================funciones de la ventana listaAsignarComisionado================
    changeRadio: function (grupo, cmp) {
        win = this.getWinReincidencia();
        if (cmp.seleccionAgregar == 1)
        {
            win.down('button[name=btnGuardar]').setVisible(false);
            win.down('form[name=formAnexo]').setVisible(true);
            win.down('textfield[name=txtDireccion]').setVisible(false);
            win.down('filefield[name=txtArchivo]').setVisible(false);
          
        }
        else {

            win.down('button[name=btnGuardar]').setVisible(true);
        }
    },
    onClickGuardarReincidencia: function (button, e, options) {

        grid = this.getListaEventosReincidencia();
        grid2 = this.getListaReincidenciaEvento();
        win = this.getWinReincidencia();

        record = grid.getSelectionModel().getSelection();

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'reincidencia/reincidencia/registrarReincidencia',
            method: 'POST',
            params: {
                txtDescripcion: win.down('textfield[name=txtDescripcion]').getValue(),
                txtCosto: win.down('textfield[name=txtCosto]').getValue(),
                id: record[0].get('idEv'),
            },
            success: function (result, request) {
                data = Ext.JSON.decode(result.responseText);

                if (data.success) {
                    grid2.getView().refresh();
                    grid2.getStore().load();
                    win.close();
                    Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                }
                else {
                    Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    // myapp.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function (result, request) {
                var result = action.result;
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }
        });


    },
    changeTipoAnexo: function (grupo, cmp) {
        win = this.getWinReincidencia();
        form =  win.getForm();
        if (cmp.seleccion == 1)
        {
            win.down('button[name=btnGuardar]').setVisible(true);
            form.down('textfield[name=txtDireccion]').setVisible(true);
            form.down('filefield[name=txtArchivo]').setVisible(false);
        }
        else {
            win.down('button[name=btnGuardar]').setVisible(true);
            win.down('textfield[name=txtDireccion]').setVisible(false);
            win.down('textfield[name=txtArchivo]').setVisible(true);
        }
    },
    onClickGuardarAnexo: function (button, e, options) {
        win = this.getWinReincidencia();
        
        formulario= win1.down('form[name=formAnexo]').getForm();
        formulario.submit({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'reincidencia/anexo/guardarEmpleado',
            method: 'POST',
            params: formulario.getValues(),
            success: function (form, action) {

                if (result.success) {

                } else {

                }
            },
            failure: function(form,action) {
                var result = action.result;
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

            }

        });



    },
//// -----------Funciones los anecos---------




//-----------------------------------------------------------------------------------------------------------------------


});