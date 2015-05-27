Ext.define('myapp.controller.registrar.UsuarioController', { 
    extend: 'Ext.app.Controller',
    views: [
        'registrar.Usuario',
        'registrar.Usuariolista',
        'registrar.Registro',
        'registrar.Gridbuscar',
        'registrar.Gridbuscaremp'
    ],
    stores: [
        'usuario.Tipousuario',
        'usuario.Nacionalidad'
    ],
    refs: [{
        ref: 'Usuariolista',
        selector: 'usuariolista'
    },{
        ref: 'userPicture',
        selector: 'registro image'
    },{
        ref: 'Gridbuscaremp',
        selector: 'gridbuscaremp'
    },{
        ref: 'Gridbuscar',
        selector: 'gridbuscar'
    }],
    init: function(application) {
        this.control({ 
            "usuario itemclick": { // #2
                click: this.onclick   
            },
             "gridbuscaremp button#agregar": {
                click: this.onButtonClickagregar
            },
            "usuario button#add": {
                click: this.onButtonClickAdd
            },
            "usuario button#edit": {
                click: this.onButtonClickEdit
            },
            "registro button#save": {
                click: this.onButtonClickSave
            },
            "registro button[itemId=cancel]": {
                click: this.onButtonClickCancel
            },
            "registro button[itemId=buscar]": {
                click: this.onButtonClickbuscarEmpleado
            },
             "registro filefield": {
                change: this.onFilefieldChange
            },
            "usuario button#delete": {
                click: this.onButtonClickDelete
            },
            "registro textfield[name=cedula]": {
            specialkey: this.onTextfieldSpecialKey
         
            },
            "usuario button#excel": {
                click: this.onButtonClickExcel
            },
              "registro combobox[name=status]": {
            select: this.seleccionstatus
            }
        }); 
    },
    seleccionstatus: function(button, combobox, e, options){
        var win = button.up('window');
        var formPanel = button.up('form');
        formPanel1= win.down('toolbar');
        status = formPanel.down("combobox[name=status]").getValue();
        if (status==1){
            formPanel1.down('button[name=save]').enable(true);
        }
    },
    onclick:function(dv, record, item, index, e) {
        grid = this.getUsuariolista(), 
        record = grid.getSelectionModel().getSelection();
        var win = field.up('window'),
        formPanel = win.down('form #registro'),
        formPanel1= win.down('toolbar');
        if(record[0]){ 
            if(record[0].get('status')==0){
                Ext.Msg.alert( 'Error','Usuario esta inactivo, verifique su status');
                formPanel1.down('button[name=save]').disable(true);
            }
       }    
    },
    onButtonClickbuscarEmpleado:function (button, e, options) {
        var win=Ext.create('myapp.view.registrar.Gridbuscar');
        win.show();
    },
    onTextfieldSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER || e.getKey() == e.TAB){
            var win = field.up('window'),
            formPanel = win.down('form'),
            nac = formPanel.down('textfield[name=nacionalidad]').getValue(),  
            ced = formPanel.down('textfield[name=cedula]').getValue();
            foto=formPanel.down('textfield[name=foto]').getValue();
            Ext.Ajax.request({
                url: BASE_URL + 'registrar/usuario/existeusuario',
                method:'POST',
                params: { 
                  ced: ced,
                  nac: nac
                } ,
                success: function(conn, response, options, eOpts) {
                    var result = Ext.JSON.decode(conn.responseText, true); 
                    if (result.success) {
                      Ext.Msg.alert( 'Alerta','Usuario ya esta registrado'); 
                    } 
                } 
            });
        }
    },
    onButtonClickAdd: function (button, e, options) {
        var win=Ext.create('myapp.view.registrar.Gridbuscar');
        win.show();
    },
    onButtonClickagregar: function (button, e, options) {        
        var grid = this.getGridbuscaremp();
        var win=this.getGridbuscar();
        record = grid.getSelectionModel().getSelection();
     
        if(record[0]){
            var editWindow = Ext.create('myapp.view.registrar.Registro');
            editWindow.down('form').getForm().reset();
            editWindow.down('form').loadRecord(record[0]);
            grid.close();
            win.close();
             if (record[0].get('foto')){
                var img = editWindow.down('image');
                img.setSrc(BASE_PATH+'./empleados/_DSC' + record[0].get('foto'));
            }
           editWindow.show();
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', 
            msg: 'Debe seleccionar por lo menos un empleado', 
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    onButtonClickEdit: function (button, e, options) {
        var grid = this.getUsuariolista(),
        record = grid.getSelectionModel().getSelection();
        if(record[0]){
            var editWindow = Ext.create('myapp.view.registrar.Registro');
            editWindow.down('form').getForm().reset();
            editWindow.down('form').loadRecord(record[0]);
            editWindow.down('textfield[name=cedula]').setReadOnly(true);
            editWindow.down('textfield[name=nacionalidad]').setReadOnly(true);
            if (record[0].get('foto')){
                var img = editWindow.down('image');
                 img.setSrc(BASE_PATH+'./empleados/_DSC' + record[0].get('foto'));
            }
            editWindow.setTitle(record[0].get('name'));
            editWindow.show();
            if (record[0].get('status')==0) {
                Ext.Msg.alert( 'Error','Usuario esta inactivo, verifique su status');
                editWindow.down('toolbar').down('button[name=save]').disable(true);
            }else{
                editWindow.down('toolbar').down('button[name=save]').enable(true);
            }
        }
    },
    onButtonClickCancel: function(button, e, options) {  
        var win = button.up('window');    
        win.close();
        //store.load();
        //grid.getSelectionModel().clearSelections();
    },
    onButtonClickSave: function(button, e, options) {
        var win = button.up('window');
        form = win.down('form');
        grid=this.getUsuariolista();
        var id=form.down("hiddenfield[name=id]").getValue();
        var cedula=form.down("textfield[name=cedula]").getValue();
        var nacionalidad=form.down("combobox[name=nacionalidad]").getValue();
        var tipousuario=form.down("combobox[name=tipousuario]").getValue();
        var usuario=form.down("textfield[name=usuario]").getValue();
        var status=form.down("combobox[name=status]").getValue();
        console.log (status);
        me=this;
        if (form.getForm().isValid()) { 
               Ext.Ajax.request({ 
                    url: BASE_URL + 'registrar/usuario/guardarusuario',
                    method:'POST',
                       params: {
                        id:id,
                        cedula:cedula,
                        nacionalidad:nacionalidad,
                        tipousuario:tipousuario,
                        usuario:usuario,
                        status:status
                    },
                    success : function(form,action) {
                        var result = Ext.JSON.decode(form.responseText);;
                        console.log(result);
                        if (result.success) {
                            Ext.Msg.alert('Informaci&oacute;n','Usuario guardado con Exito');
                            win.close();
                            grid.getStore().load();
                            grid.getSelectionModel().clearSelections();
                           
                        }else{
                             Ext.Msg.alert('Informaci&oacute;n',result.msg);
                             win.close();
                             grid.getStore().load();
                             grid.getSelectionModel().clearSelections();
                        }
                    },
                });
            
        }
    },
    onButtonClickDelete: function (button, e, options) {
        var grid = this.getUsuariolista(),
        record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore();
        if (store.getCount() >= 2 && record[0]){
            Ext.Msg.show({
                title:'Eliminar?',
                msg: 'Esta seguro que desea Eliminar?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (buttonId){
                    if (buttonId == 'yes'){
                        Ext.Ajax.request({
                            url: BASE_URL + 'registrar/usuario/eliminarusuario',
                            params: {
                                id: record[0].get('id'),
                                cedula: record[0].get('cedula'),
                                nacionalidad: record[0].get('nacionalidad'),  
                            },
                            success: function(conn, response, options, eOpts) {
                                var result = myapp.util.Util.decodeJSON(conn.responseText);
                                if (result.success) {
                                    myapp.util.Util.showdeleteMsg('!', 'Usario eliminado.');
                                    store.load();
                                }else{
                                    myapp.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {
                                myapp.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                }
            });
        } else if (store.getCount() == 1){
            Ext.Msg.show({
                title:'Warning',
                msg: 'Tu no puedes eliminar todos los usuarios del sistema.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },
    onFilefieldChange: function(filefield, value, options) {
        var file = filefield.fileInputEl.dom.files[0];
        var picture = this.getUserPicture();
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file); 
        }else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset();
        }   
    }    
}); 