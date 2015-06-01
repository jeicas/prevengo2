Ext.define('myapp.controller.seguridad.PermisoController', {
    extend: 'Ext.app.Controller',
    views: ['seguridad.PermisoForm',
        'maestroNombre.WinMaestroTipoUsuario'

    ],
    requires: [
        'myapp.util.Util'

    ],
    refs: [
        {
            ref: 'PermisoForm',
            selector: 'permisoForm'
        },
        {
            ref: 'WinMaestroTipoUsuario',
            selector: 'winMaestroTipoUsuario'
        },
    ],
    init: function (application) {
        this.control({
            "permisoForm combobox[name=cmbTipoUsuario]": {
                change: this.onClickCargarGrid
            },
            "permisoForm combobox[name=cmbMenu]": {
                change: this.onClickHabilitarBoton
            },
            "permisoForm button[name=btnNuevoTipoUsuario]": {
                click: this.onClickNuevoTipoUsuario
            },
            "permisoForm button[name=btnAgregarMenu]": {
                click: this.onClickAgregarAMenu
            },
            "permisoForm actioncolumn[name=eliminar]": {
                click: this.onClickElininarMenu
            },
            "winMaestroTipoUsuario button[name=btnGuardar]": {
                click: this.onClickGuardarTipoUsuario
            }
        });
    },
    onClickCargarGrid: function (form) {
        formulario = this.getPermisoForm();
        formulario.down("button[name=btnNuevoTipoUsuario]").setDisabled(false);
        formulario.down("combobox[name=cmbMenu]").setDisabled(false);
        valor = formulario.down("combobox[name=cmbTipoUsuario]").getValue();

        store1 = formulario.getStore();
        store1.proxy.extraParams.id = valor
        store1.load();
    },
    onClickHabilitarBoton: function (form) {
        formulario = this.getPermisoForm();
        formulario.down("button[name=btnAgregarMenu]").setDisabled(false);

    },
    onClickNuevoTipoUsuario: function (button, e, options) {

        var win = Ext.create('myapp.view.maestroNombre.WinMaestroTipoUsuario');
        win.setTitle('Nuevo Tipo de Usuario');
        win.show();

    },
    onClickAgregarAMenu: function (button, e, options) {

        formulario = this.getPermisoForm();
        valor = formulario.down("combobox[name=cmbMenu]").getValue();
        store = formulario.down("combobox[name=cmbMenu]").getStore();
        padre = '';
        store1 = formulario.getStore();

        for (i = 0; i < store.data.items.length; ++i) {
            if (store.data.items[i].data['id'] == valor) {
                padre = store.data.items[i].data['padre'];
                i = store1.data.items.length + 1;
            }
        }


        for (i = 0; i < store1.data.items.length; ++i)
        {
            if (store1.data.items[i].data['id'] == valor) {
                Ext.MessageBox.show({title: 'Alerta', msg: 'Este items ya esta registrado.Por favor seleccione otro', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                i = store1.data.items.length + 1;
            }


        }
        Ext.Ajax.request({
            url: BASE_URL + 'permiso/permiso/guardarPermiso',
            method: 'POST',
            params: {
                idMenu: valor,
                tipousuario: formulario.down("combobox[name=cmbTipoUsuario]").getValue(),
                idpadre: padre

            },
            success: function (form, action) {
                var result = Ext.JSON.decode(form.responseText);
                

                if (result.success) {
                    Ext.Msg.alert('Informaci&oacute;n', 'acceso guardado con Exito');
                    formulario.getStore().load();


                } else {
                    Ext.Msg.alert('Informaci&oacute;n', result.msg);
                    formulario.getStore().load();

                }
            },
        });
      
    },
    onClickElininarMenu: function (grid, record, rowIndex) {
        var grid = this.getPermisoForm();
        store = grid.getStore();
        rec = store.getAt(rowIndex);

        Ext.Msg.show({
            title: 'Confirmar',
            msg: 'Esta seguro que desea eliminar el items ' + rec.get('nombre') + ' del menú?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    Ext.Ajax.request({//AQUI ENVIO LA DATA 
                        url: BASE_URL + 'permiso/permiso/eliminarMenu',
                        method: 'POST',
                        params: {
                            menu: rec.get('id'),
                            tipoUsuario:grid.down("combobox[name=cmbTipoUsuario]").getValue(),
                        },
                        success: function (result, request) {
                            result = Ext.JSON.decode(result.responseText);
                            if (result.success) {
                                grid.getView().refresh();
                                grid.getStore().load();
                                Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                            }
                            else {
                                Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                // myapp.util.Util.showErrorMsg(result.msg);
                            }
                        },
                        failure: function (form, action) {
                            var result = action.result;
                            
                            Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

                        }
                    });

                }
            }
        });


    },
    //=============================Win Tipo Usuario==========================================================================
    onClickGuardarTipoUsuario: function (button, e, options) {

        winO = this.getWinMaestroTipoUsuario();

        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'tipoUsuario/tipoUsuario/registrarTipoUsuario',
            method: 'POST',
            params: {
                txtNombre: winO.down("textfield[name=nombre]").getValue(),
            },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                loadingMask.hide();
                if (result.success) {


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


});



