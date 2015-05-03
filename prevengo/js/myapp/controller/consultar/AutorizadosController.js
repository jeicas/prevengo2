Ext.define('myapp.controller.consultar.AutorizadosController', {
    extend: 'Ext.app.Controller',
    views: [
        'consultar.Autorizados',
        'consultar.AutorizadosLista'
    ],
    refs: [{
        ref: 'AutorizadosLista',
        selector: 'autorizadosLista'
    },{
        ref: 'Autorizados',
        selector: 'autorizados'
    }],
    init: function(application) {
        this.control({
            "autorizados button#guardarEvento": {
                click: this.guardarEvento
            },
            "autorizadosLista actioncolumn": {
                click: this.guardarSolo
            }
        }); 
    },
    guardarEvento: function(button, e, options) {
        grid = this.getAutorizadosLista(),
        formPanel = this.getAutorizados(),
        modified = grid.getSelectionModel().getSelection();//step 1
        if(!Ext.isEmpty(modified)){
            Ext.get(grid.getEl()).mask("Guardando evento... Por favor espere...",'loading');
            var recordsToSend = [];
            Ext.each(modified, function(record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.encode(recordsToSend);
            Ext.Ajax.request({
                method:'POST',
                url : '../registrar/autorizacion/actualizarAutorizacion',
                params :{
                    records : recordsToSend
                },
                success : function(form,action) {
                    Ext.get(grid.getEl()).unmask();
                    info = Ext.JSON.decode(form.responseText);
                    if(info.success==true){
                        Ext.Msg.alert("Aviso","Guardado satisfactoriamente");
                        grid.getStore().load();
                        var selection = grid.getView().getSelectionModel().getSelection();
                        if (selection.length > 0){ 
                            for( var i = 0; i < selection.length; i++) {
                                grid.getStore().remove(selection[i]); 
                            } 
                        }
                   }
                }
            });
        }
        else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
            msg: 'Debe seleccionar por lo menos un empleado', 
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    guardarSolo: function(grid, record,rowIndex){
        grid = this.getAutorizadosLista(),
        store = this.getAutorizadosLista().getStore(),
       modified =store.getAt(rowIndex);
       if(!Ext.isEmpty(modified)){
            Ext.get(grid.getEl()).mask("Guardando evento... Por favor espere...",'loading');
            var recordsToSend = [];
            Ext.each(modified, function(record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.encode(recordsToSend);
            Ext.Ajax.request({
                method:'POST',
                url : '../registrar/autorizacion/actualizarAutorizacion',
                params :{
                    records : recordsToSend
                },
                success : function(form,action) {
                    Ext.get(grid.getEl()).unmask();
                    info = Ext.JSON.decode(form.responseText);
                    if(info.success==true){
                        Ext.Msg.alert("Aviso","Guardado satisfactoriamente");
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
});
