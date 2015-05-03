Ext.define('myapp.controller.consultar.ProcesadosController', {
    extend: 'Ext.app.Controller',
    views: [
        'consultar.Procesadas',
        'consultar.ProcesadasLista'
    ],
    refs: [{
        ref: 'ProcesadasLista',
        selector: 'procesadasLista'
    },{
        ref: 'Procesadas',
        selector: 'procesadas'
    }],
    init: function(application) {
        this.control({
            "procesadas button#buscarProcesadas": {
                click: this.buscarProcesadas
            }
        }); 
    },
    buscarProcesadas: function(button, e, options) {
        grid = this.getProcesadasLista(),
        formPanel = this.getProcesadas(),
        tipoAutorizacion= formPanel.down("combobox[name=tipoAutorizacion]").getValue();
        dependencia     = formPanel.down("combobox[name=dependencia]").getValue();
        fechaA          = formPanel.down("datefield[name=fechaAutorizacion]").getValue();
        fecha=Ext.Date.format(fechaA, 'Y-m-d');
        if(tipoAutorizacion==null &&dependencia==null &&fecha==null){
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
            msg: 'Debe seleccionar al menos un filtro', 
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
        else{
            gridStore = this.getProcesadasLista().getStore(),
            gridStore.proxy.extraParams.tipoAutorizacion=formPanel.down("combobox[name=tipoAutorizacion]").getValue();
            gridStore.proxy.extraParams.dependencia=formPanel.down("combobox[name=dependencia]").getValue();
            gridStore.proxy.extraParams.fecha=fecha;
            gridStore.proxy.extraParams.boton=1;
            gridStore.load();
            grid.getView().refresh(true);
            formPanel.down("combobox[name=tipoAutorizacion]").reset();
            formPanel.down("combobox[name=dependencia]").reset();
            formPanel.down("datefield[name=fechaAutorizacion]").reset();

        }
    }
});
