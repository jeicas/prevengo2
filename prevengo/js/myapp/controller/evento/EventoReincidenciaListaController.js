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
            "winReincidencia button[name=btnGuardar]": {
                click: this.onClickGuardarReincidencia
            },
            "winReincidencia button[name=btnSubirArchivo]": {
                change: this.previewImage
            }


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
                    }else { store = newGrid2.getStore();
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
         console.log(record[0].get('idEv'));
        win = Ext.create('myapp.view.evento.WinReincidencia');
        win.setTitle("Nueva Reincidencia");
        win.down("label[name=lblIdEvento]").setText(record[0].get('idEv'));
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

    onClickGuardarReincidencia: function (button, e, options) {

        grid = this.getListaEventosReincidencia();
        grid2 = this.getListaReincidenciaEvento();
        win = this.getWinReincidencia();
        // if (nuevo){     
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

        record = grid.getSelectionModel().getSelection();

        form= win.down('form[name=formReincidencia]').getForm();
        
         form.submit(
                {//AQUI ENVIO LA DATA 
                    url: BASE_URL + 'reincidencia/reincidencia/registrarReincidencia',
                    method: 'POST',
                    params: form.getValues(),
                    
                    success: function (result, request) {
                        result = Ext.JSON.decode(result.responseText);
                        loadingMask.hide();

                        if (result.success) {
                            grid2.getView().refresh();
                            grid2.getStore().load();
                            win.close();
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
                }


        );
        // }
        /* else { 
         var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
         loadingMask.show();
         
         record = grid2.getSelectionModel().getSelection();
         
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
         url: BASE_URL + 'lineamiento/lineamiento/actualizarComisionado',
         method: 'POST',
         params: {
         descripcion: winO.down("textfield[name=txtDescripcion]").getValue(),
         idLineam: record[0].get('idLin')
         },
         success:  function(result, request){
         result=Ext.JSON.decode(result.responseText);
         loadingMask.hide();
         
         if (result.success) {
         grid2.getView().refresh();
         grid2.getStore().load();
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
         
         }*/

    },
    onClickLimpiarComisionado: function (button, e, options) {


    },
//// -----------Funciones para la vista previa de la imagen y validar la extension de los archivos.---------
    /**
     checkFileExtension:function (elem) {
     
     var filePath = elem;
     
     if(filePath.indexOf('.') == -1)
     return false;
     
     var validExtensions = new Array();
     var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
     
     if (typeExtension=="image") {
     validExtensions[0] = 'jpg';
     validExtensions[1] = 'jpeg';
     validExtensions[3] = 'png';
     
     
     }
     
     for(var i = 0; i < validExtensions.length; i++) {
     if(ext == validExtensions[i])
     return true;
     }
     
     Ext.Msg.alert('Advertencia', 'La extension .'+ext+' del archivo ' + filePath + ' no es permitida!');
     
     if (typeExtension=="image") {
     document.getElementsByName('btnSubirArchivo[]')[0].value='';
     
     }
     
     return false;
     },
     */



    previewImage: function (fieldfile) {


      
        /*
         if (!checkFileExtension(encodeURIComponent(document.getElementsByName("btnSubirArchivo[]")[0].value)))
         {
         return false;  
         }
         if (input) {
         var reader = new FileReader();
         reader.onload = function (e) {
         //cambiar imagenArea por el id de la imagen que se esta usando en el js. 
         document.getElementById('img').src = e.target.result
         }
         reader.readAsDataURL(input);
         }*/

    }
    //-----------------------------------------------------------------------------------------------------------------------


});