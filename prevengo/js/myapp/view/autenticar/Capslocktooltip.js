Ext.define('myapp.view.autenticar.Capslocktooltip', {
    extend: 'Ext.tip.QuickTip',
    alias: 'widget.capslocktooltip',
    target: 'password',
    anchor: 'top',
    anchorOffset: 60,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="capslock">Caps Lock is On</div>',
    html: '<div>Tiene la tecla bloqueo de mayúsculas activada y puede que introduzca su contraseña incorrecta.</div>' 
});