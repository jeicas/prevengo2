var nuevo = false;
Ext.define('myapp.controller.evento.EventoListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventos',
        'evento.WinEvento',
        'evento.Evento',
        'observacion.WinObservacion'
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
            ref: 'WinObservacion',
            selector: 'winObservacion'
        },
        {
            ref: 'Observacion',
            selector: 'observacion'
        },
    ],
    init: function (application) {
        this.control({
            "listaEventos button[name=btnNuevo]": {
                click: this.onClickNuevoEvento
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
            "winObservacion button[name=btnGuardar]": {
                click: this.onClickGuardarObservacionCancelar
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
          if (record[0].get('estatus')!='<font color=#01DF3A> Completado </font>'){
              Ext.Msg.show({
                title: 'Confirmar',
                msg: 'Esta seguro que desea CANCELAR el Evento ' + record[0].get('titulo') + '?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId) {
                    if (buttonId == 'yes') {
                        var win = Ext.create('myapp.view.observacion.WinObservacion');
                        win.setTitle("Cancelar Evento " + record[0].get('estatus'));
                        win.down('label[name=lblDescripcion]').setText("Indique la razón por la que desea cancelar el Evento"+record[0].get('titulo')+"?");
                        win.show();
                    }
                }
            });
          }
          else {
              Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'El evento ha finalizado, no lo puede cancelar',
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO}); 
          }
            
               
        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n',
                msg: 'Debe seleccionar el evento que desea cancelar',
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
                    txtDescripcion:win.down('textfield[name=txtDescripcion]').getValue(),
                    txtPresupuesto:win.down('textfield[name=txtPresupuesto]').getValue(),
                    cmbAgente:win.down('combobox[name=cmbAgente]').getValue(),
                    cmbAlcance:win.down('combobox[name=cmbAlcance]').getValue(),
                    cmbSector:win.down('combobox[name=cmbSector]').getValue(),
                    cmbTipoEvento:win.down('combobox[name=cmbTipoEvento]').getValue(),
                    dtfFechaT:win.down('datefield[name=dtfFechaT]').getValue(),
                    dtfFechaPA:win.down('datefield[name=dtfFechaPA]').getValue(),
                },
               
                
                success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
                    
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
                    txtIdEvento:record[0].get('idEv'),
                    txtTitulo: win.down('textfield[name=txtTitulo]').getValue(),
                    txtDescripcion:win.down('textfield[name=txtDescripcion]').getValue(),
                    txtPresupuesto:win.down('textfield[name=txtPresupuesto]').getValue(),
                    cmbAgente:win.down('combobox[name=cmbAgente]').getValue(),
                    cmbAlcance:win.down('combobox[name=cmbAlcance]').getValue(),
                    cmbSector:win.down('combobox[name=cmbSector]').getValue(),
                    cmbTipoEvento:win.down('combobox[name=cmbTipoEvento]').getValue(),
                    dtfFechaT:win.down('datefield[name=dtfFechaT]').getValue(),
                    dtfFechaPA:win.down('datefield[name=dtfFechaPA]').getValue(),
                },
                 success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
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


    //======================Funciones de la ventana Observaciones ====================0
    onClickGuardarObservacionCancelar: function (button, e, options) {
         
        grid = this.getListaEventos();
        winO = this.getWinObservacion();
             
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
            success:  function(result, request){
                   result=Ext.JSON.decode(result.responseText);
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