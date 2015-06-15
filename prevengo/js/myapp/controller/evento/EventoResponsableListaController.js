var nuevo = false;
var nuevorespo = false;
Ext.define('myapp.controller.evento.EventoResponsableListaController', {
    extend: 'Ext.app.Controller',
    views: ['evento.ListaEventoResponsable'
        
    ],
    requires: [
        'myapp.util.Util'
    ],
    refs: [
        {
            ref: 'ListaEventoResponsable',
            selector: 'listaEventoResponsable'
        },
        {
            ref: 'WinAsignarUsuario',
            selector: 'winAsignarUsuario'
        },
        {
            ref: 'ListaAsignarUsuario',
            selector: 'listaAsignarUsuario'
        },
        {
            ref: 'WinUsuarioSeleccionado',
            selector: 'winUsuarioSeleccionado'
        },
        
    ],
    init: function (application) {
        this.control({
            "listaEventoResponsable": {
                itemdblclick: this.onClickNuevoResponsable
            },
            "listaAsignarUsuario button[name=btnGuardar]": {
                click: this.onClickGuardarResponsable
            },
            "winUsuarioSeleccionado button[name=btnCambiar]": {
                click: this.onClickCambiarResponsable
            }
            
        });
    },
    //==============Funciones de la Lista =====================================
    onClickNuevoResponsable: function (record, item, index, e, eOpts ) {
     var win;

        if (item.data.nombrecompleto=='<font color=#FF0000> Por Asignar </font>'){
           nuevorespo=true;
           win= Ext.create('myapp.view.evento.WinAsignarUsuario');
           win.setTitle("Asignar Responsable");
        }
        else {
            var grid=this.getListaEventoResponsable();
            record=grid.getSelectionModel().getSelection();
              win = Ext.create('myapp.view.evento.WinUsuarioSeleccionado');
              win.down('textfield[name=txtCedula]').setReadOnly(true);
              win.down('textfield[name=txtNombreCompleto]').setReadOnly(true);
              win.down('textfield[name=txtCargo]').setReadOnly(true);
              win.down('textfield[name=txtEnte]').setReadOnly(true);
              win.down('textfield[name=txtDivision]').setReadOnly(true);
              
              
              win.down('textfield[name=txtCedula]').setValue(record[0].get('cedula'));
              win.down('textfield[name=txtNombreCompleto]').setValue(record[0].get('nombrecompleto'));
              win.down('textfield[name=txtCargo]').setValue(record[0].get('cargo'));
              win.down('textfield[name=txtEnte]').setValue(record[0].get('ente'));
              win.down('textfield[name=txtDivision]').setValue(record[0].get('division'));
              if (record[0].get('foto')){
                var img = win.down('image');
                 img.setSrc(BASE_PATH+'./empleados/_DSC' + record[0].get('foto'));
            }
              win.setTitle("Responsable Asignado");
              if (item.data.estatus=='Sin Plan' || item.data.estatus=='Pendiente' ){
                 win.down('button[name=btnCambiar]').setVisible(true);
              }else {win.down('button[name=btnCambiar]').setVisible(false);}
        }
          win.show();
        

    }, // fin de la function
    
    // ====================funciones de la ventana Usuario Selecciionado================
    onClickCambiarResponsable: function (button, e, options) {
     var win;
         var win2=this.getWinUsuarioSeleccionado();
         
           win= Ext.create('myapp.view.evento.WinAsignarUsuario');
            win.setTitle("Asignar Responsable");
        
        win2.close();
        win.show();
       
    },
    
    
   // ====================funciones de la ListaAsignarUsuario ================
    onClickGuardarResponsable: function (button, e, options) {
    if (nuevorespo){
         var grid= this.getListaEventoResponsable();
         var gridUsu= this.getListaAsignarUsuario();
         var win = this.getWinAsignarUsuario();
         record1 = gridUsu.getSelectionModel().getSelection();
         record2 = grid.getSelectionModel().getSelection();
        
       
        
        if(record1[0]){
                    
                Ext.Ajax.request({
                    url: BASE_URL+'actividad/actividad/asignarEmpleado',
                    method: 'POST',
                    params: {
                        user:record1[0].get('id'),
                        event:record2[0].get('idEv'),
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                              Ext.MessageBox.show({ title: 'Mensaje', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                                grid.getView().refresh();
                                grid.getStore().load();
                                win.close();
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(result, request){
                    var result = Ext.JSON.decode(result.responseText);   
                     loadingMask.hide();
                           Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                     }
                });                
                             
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar un Empleado',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    }else{
         var grid= this.getListaEventoResponsable();
         var gridUsu= this.getListaAsignarUsuario();
         var win = this.getWinAsignarUsuario();
         record1 = gridUsu.getSelectionModel().getSelection();
         record2 = grid.getSelectionModel().getSelection();
        
     
        if(record1[0]){
                    
                Ext.Ajax.request({
                    url: BASE_URL+'actividad/actividad/reAsignarEmpleado',
                    method: 'POST',
                    params: {
                        user:record1[0].get('id'),
                        event:record2[0].get('idEv'),
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                              Ext.MessageBox.show({ title: 'Mensaje', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                                grid.getView().refresh();
                                grid.getStore().load();
                                win.close();
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(result, request){
                    var result = Ext.JSON.decode(result.responseText);   
                     loadingMask.hide();
                           Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                     }
                });                
                             
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n',
            msg: 'Debe seleccionar un Empleado',
            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    }
        

    }, // fin de la function
    
    
    
  
});