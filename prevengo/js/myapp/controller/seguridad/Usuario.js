Ext.define('myapp.controller.seguridad.Usuarioisa', {
    extend: 'Ext.app.Controller',
    views: [
        'seguridad.Usuario',
        'seguridad.Usuariolista',
    ],
    refs: [{
        ref: 'Usuariolista',
        selector: 'usuariolista'
    },{
        ref: 'Usuario',
        selector: 'usuario'
    }],
    init: function(application) {
        this.control({
            "usuario button#guardarAutorizacion": {
                click: this.guardarAutorizacion
            }
        }); 
    },
    guardarAutorizacion: function(button, e, options) {
        grid = this.getUsuariolista(),
        formPanel = this.getUsuario(),
        f=formPanel.down("datefield[name=fechaAutorizacion]").getValue();
        hE=formPanel.down("timefield[name=horaEntrada]").getValue();
        hS=formPanel.down("timefield[name=horaSalida]").getValue();
        tipoAutorizacion= formPanel.down("combobox[name=tipoAutorizacion]").getValue();        
        if(f==null || hS==null|| tipoAutorizacion==null){
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
            msg: 'Debe seleccionar la evaluación, fecha y hora', 
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }        
        else{
            if(tipoAutorizacion=='SALIDA'){
            Ext.MessageBox.confirm('Confirmar', '¿La salida del empleado sera con retorno?',
              function(btn) {
                if (btn === 'yes'){
                    Ext.Msg.alert("Aviso","Debe especificar la hora de entrada del empleado");
                    formPanel.down("timefield[name=horaEntrada]").setDisabled(false);
                }
              });
            }
            fech= formPanel.down("datefield[name=fechaAutorizacion]").getValue();            
            fechaA=Ext.Date.format(fech, 'Y-m-d');
            horE= formPanel.down("timefield[name=horaEntrada]").getValue();
            horaE=Ext.Date.format(hor, 'g:i A');
            horS= formPanel.down("timefield[name=horaSalida]").getValue();
            horaS=Ext.Date.format(horS, 'g:i A');
            modified = grid.getSelectionModel().getSelection();//step 1
            if(!Ext.isEmpty(modified)){
                Ext.get(grid.getEl()).mask("Enviando correo(s)... Por favor espere...",'loading');
                var recordsToSend = [];
                Ext.each(modified, function(record) { //step 2
                    recordsToSend.push(Ext.apply(record.data));
                });
                recordsToSend = Ext.encode(recordsToSend);
                //console.log(recordsToSend);
                Ext.Ajax.request({
                    method:'POST',
                    url : '../autorizacion/autorizacion/guardarAutorizacion',
                    params :{
                        tipoAutorizacion  : tipoAutorizacion,
                        records : recordsToSend,
                        fechaA  : fechaA,
                        horaE   : horaE,
                        horaS   : horaS
                    },
                    success : function(form,action) {
                        Ext.get(grid.getEl()).unmask();
                        info = Ext.JSON.decode(form.responseText);
                        if(info.success==true){
                            Ext.Msg.alert("Aviso","Registro guardado satisfactoriamente");
                            formPanel.down("datefield[name=fechaAutorizacion]").reset();
                            formPanel.down("timefield[name=horaEntrada]").reset();
                            formPanel.down("timefield[name=horaSalida]").reset();
                            formPanel.down("combobox[name=tipoAutorizacion]").reset();
                            grid.getStore().load();
                       }
                    }
                });
            }
            else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
                msg: 'Debe seleccionar por lo menos un empleado', 
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }
    }
});