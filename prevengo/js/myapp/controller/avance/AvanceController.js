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
            }



        });
    }, 
    
    //===================== Funciones de la Lista===============================
    onClickAgregarAvance: function (button, e, options){
         var win = Ext.create('myapp.view.avance.Gridbuscar');
        win.setTitle("Nuevo Avance");
        win.show();
    },
    
    
    //===================== Funciones del formulario===============================
    onClickguardarAvance: function (button, e, options) {
        formulario = this.getAvance();
        grid = this.getGridListaAvance();
        win = this.getGridbuscar();
        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "grabando..."});
        loadingMask.show();

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
    }, // fin de la function 


    onClickLimpiarAvance: function (form) {
        formulario = this.getAvance();
        formulario.getForm().reset();

    }, // fin de la function 

    cambiarFecha: function (form) {
        formulario = this.getAvance();
        storeAct= formulario.down("combobox[name=cmbActividad]").getStore();
        valor= formulario.down("combobox[name=cmbActividad]").getValue();
        //fec= storeAct.data.fecha;
        //console.log(storeAct);
         for (i=0; i<storeAct.data.items.length; ++i)
         { 
            if(storeAct.data.items[i].data['id']==valor){    
             formulario.down("label[name=lblFechaAsignacion]").setText(storeAct.data.items[i].data['fecha']);
             formulario.down("label[name=lblNombreEvento]").setText(storeAct.data.items[i].data['evento']);
              i=length+1;
            }
             
         }
             
        
    }
    
   
});