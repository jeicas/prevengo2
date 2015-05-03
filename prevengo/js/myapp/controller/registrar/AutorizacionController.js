Ext.define('myapp.controller.registrar.AutorizacionController', {
    extend: 'Ext.app.Controller',
    views: [
        'registrar.Autorizacion',
        'registrar.AutorizacionLista'
    ],
    refs: [{
        ref: 'AutorizacionLista',
        selector: 'autorizacionLista'
    },{
        ref: 'Autorizacion',
        selector: 'autorizacion'
    }],
    init: function(application) {
        this.control({
            "autorizacion button#guardarAutorizacion": {
                click: this.guardarAutorizacion
            },
            "autorizacion combobox[name=tipoAutorizacion]": {
                change: this.cambioCombo
            },
            "autorizacion timefield[name=horaSalida]": {
                change: this.cambioHS
            }
        }); 
    },   

    cambioCombo: function(){        
        formPanel = this.getAutorizacion(),
        tipoAutorizacion= formPanel.down("combobox[name=tipoAutorizacion]").getValue();
        if(tipoAutorizacion=='1'){
            formPanel.down("timefield[name=horaSalida]").reset();
            formPanel.down("timefield[name=horaSalida]").setVisible(false);
            formPanel.down('timefield[name=horaSalida]').allowBlank = true;
            formPanel.down('timefield[name=horaSalida]').validateValue(formPanel.down('timefield[name=horaSalida]').getValue());
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setVisible(true);
            formPanel.down('timefield[name=horaEntrada]').allowBlank = false;
            formPanel.down('timefield[name=horaEntrada]').validateValue(formPanel.down('timefield[name=horaEntrada]').getValue());
            formPanel.down("textfield[name=placa]").setValue('');
            formPanel.down("textfield[name=placa]").setVisible(false);
            formPanel.down('textfield[name=placa]').allowBlank = true;
            formPanel.down('textfield[name=placa]').validateValue(formPanel.down('textfield[name=placa]').getValue());
        }if(tipoAutorizacion=='2'){
            formPanel.down("timefield[name=horaSalida]").reset();
            formPanel.down("timefield[name=horaSalida]").setVisible(true);
            formPanel.down('timefield[name=horaSalida]').allowBlank = false;
            formPanel.down('timefield[name=horaSalida]').validateValue(formPanel.down('timefield[name=horaSalida]').getValue());
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setVisible(false);
            formPanel.down('timefield[name=horaEntrada]').allowBlank = true;
            formPanel.down('timefield[name=horaEntrada]').validateValue(formPanel.down('timefield[name=horaEntrada]').getValue());
            formPanel.down("textfield[name=placa]").setValue('');
            formPanel.down("textfield[name=placa]").setVisible(false);
            formPanel.down('textfield[name=placa]').allowBlank = true;
            formPanel.down('textfield[name=placa]').validateValue(formPanel.down('textfield[name=placa]').getValue());
        }if(tipoAutorizacion=='3'){
            formPanel.down("timefield[name=horaSalida]").reset();
            formPanel.down("timefield[name=horaSalida]").setVisible(true);                        
            formPanel.down('timefield[name=horaSalida]').allowBlank = false;
            formPanel.down('timefield[name=horaSalida]').validateValue(formPanel.down('timefield[name=horaSalida]').getValue());
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setVisible(true);                        
            formPanel.down('timefield[name=horaEntrada]').allowBlank = false;
            formPanel.down('timefield[name=horaEntrada]').validateValue(formPanel.down('timefield[name=horaEntrada]').getValue());
            formPanel.down("textfield[name=placa]").setValue('');
            formPanel.down("textfield[name=placa]").setVisible(false);
            formPanel.down('textfield[name=placa]').allowBlank = true;
            formPanel.down('textfield[name=placa]').validateValue(formPanel.down('textfield[name=placa]').getValue());
        }if(tipoAutorizacion=='4'){
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setVisible(false);
            formPanel.down('timefield[name=horaEntrada]').allowBlank = true;
            formPanel.down('timefield[name=horaEntrada]').validateValue(formPanel.down('timefield[name=horaEntrada]').getValue());
            formPanel.down("timefield[name=horaSalida]").reset();
            formPanel.down("timefield[name=horaSalida]").setVisible(true);
            formPanel.down('timefield[name=horaSalida]').allowBlank = false;
            formPanel.down('timefield[name=horaSalida]').validateValue(formPanel.down('timefield[name=horaSalida]').getValue());
            formPanel.down("textfield[name=placa]").setValue('');
            formPanel.down("textfield[name=placa]").setVisible(true);
            formPanel.down('textfield[name=placa]').allowBlank = false;
            formPanel.down('textfield[name=placa]').validateValue(formPanel.down('textfield[name=placa]').getValue());
        }if(tipoAutorizacion==null || tipoAutorizacion=='5' || tipoAutorizacion=='6' || tipoAutorizacion=='7'){
            formPanel.down("timefield[name=horaSalida]").reset();
            formPanel.down("timefield[name=horaSalida]").setVisible(false);                        
            formPanel.down('timefield[name=horaSalida]').allowBlank = true;
            formPanel.down('timefield[name=horaSalida]').validateValue(formPanel.down('timefield[name=horaSalida]').getValue());
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setVisible(false);                        
            formPanel.down('timefield[name=horaEntrada]').allowBlank = true;
            formPanel.down('timefield[name=horaEntrada]').validateValue(formPanel.down('timefield[name=horaEntrada]').getValue());
            formPanel.down("textfield[name=placa]").setValue('');
            formPanel.down("textfield[name=placa]").setVisible(false);
            formPanel.down('textfield[name=placa]').allowBlank = true;
            formPanel.down('textfield[name=placa]').validateValue(formPanel.down('textfield[name=placa]').getValue());
        }
    },
    cambioHS: function(){
        formPanel = this.getAutorizacion();
        hS=formPanel.down("timefield[name=horaSalida]").getValue();
        hE=formPanel.down("timefield[name=horaEntrada]").getValue();
        tipoAutorizacion= formPanel.down("combobox[name=tipoAutorizacion]").getValue();
        if(tipoAutorizacion==3){
            formPanel.down("timefield[name=horaEntrada]").reset();
            formPanel.down("timefield[name=horaEntrada]").setMinValue(hS);
        }
    },
    guardarAutorizacion: function(button, e, options) {
        me=this;
        grid = this.getAutorizacionLista();
        formPanel = this.getAutorizacion();
        f=formPanel.down("datefield[name=fechaAutorizacion]").getValue();
        hE=formPanel.down("timefield[name=horaEntrada]").getValue();
        hS=formPanel.down("timefield[name=horaSalida]").getValue();
        placa=formPanel.down("textfield[name=placa]").getValue();
        tipoAutorizacion= formPanel.down("combobox[name=tipoAutorizacion]").getValue();
        motivoAutorizacion= formPanel.down("combobox[name=motivoautorizacion]").getValue();
        modified = grid.getSelectionModel().getSelection();
        if(formPanel.getForm().isValid()){
            if(!Ext.isEmpty(modified)){
                fechaA=Ext.Date.format(f, 'Y-m-d');            
                horaE=Ext.Date.format(hE,'H:i:s');            
                horaS=Ext.Date.format(hS,'H:i:s');
                if(tipoAutorizacion==1 ||tipoAutorizacion==2 ||tipoAutorizacion==3 ||(tipoAutorizacion==4 && modified.length == 1) ||tipoAutorizacion==5 || tipoAutorizacion==6 || tipoAutorizacion==7){                
                    Ext.get(grid.getEl()).mask("Guardando autorizacion(s)... Por favor espere...",'loading');
                    var recordsToSend = [];
                    Ext.each(modified, function(record) {
                        recordsToSend.push(Ext.apply(record.data));
                    });
                    recordsToSend = Ext.encode(recordsToSend);
                    Ext.Ajax.request({
                        method:'POST',
                        url : '../registrar/autorizacion/guardarAutorizacion',
                        params :{
                            tipoAutorizacion  : tipoAutorizacion,
                            motivoAutorizacion : motivoAutorizacion,
                            records : recordsToSend,
                            fechaA  : fechaA,
                            horaE   : horaE,
                            horaS   : horaS,
                            placa   : placa
                        },
                        success : function(form,action) {
                            Ext.get(grid.getEl()).unmask();
                            info = Ext.JSON.decode(form.responseText);
                            if(info.success==true){
                                if(info.data==null){
                                    mensaje=info.msg;
                                }else{
                                    mensaje=info.msg+info.data;
                                }
                                Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
                                msg: mensaje, 
                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                                formPanel.down("datefield[name=fechaAutorizacion]").reset();
                                formPanel.down("timefield[name=horaEntrada]").reset();
                                formPanel.down("timefield[name=horaSalida]").reset();
                                formPanel.down("combobox[name=tipoAutorizacion]").reset();                                
                                formPanel.down("combobox[name=motivoautorizacion]").reset();
                                formPanel.down("textfield[name=placa]").reset();
                                grid.getStore().load();
                                me.cambioCombo();
                                var selection = grid.getView().getSelectionModel().getSelection();
                                if (selection.length > 0){ 
                                    for( var i = 0; i < selection.length; i++) {
                                        grid.getStore().remove(selection[i]); 
                                    } 
                                }
                           }
                        }
                    });
                }else{
                    Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
                    msg: 'Para este tipo de autorizacion solo se puede seleccionar un empleado', 
                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                }
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
                msg: 'Debe seleccionar por lo menos un empleado', 
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });                
            }               
        }
    }
});
