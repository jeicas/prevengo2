Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../../js/ext/examples/ux');
Ext.application({
    name: "myapp",
    appFolder: BASE_PATH + "js/myapp",
    controllers: [
        'myapp.controller.Menu'
                , 'myapp.controller.actividad.ListaPlanEventoController',
        'myapp.controller.seguridad.Contrasena', 
        'myapp.controller.login.Login'
    ],
    requires: [
        'myapp.view.login.Login',
        'myapp.controller.login.Login',
        'myapp.controller.seguridad.Contrasena',
        'myapp.vtypes.Validadores'
    ],
    launch: function () {
        Ext.create('myapp.vtypes.Validadores').init();
        var win = Ext.create("myapp.view.Viewport")
    }
});