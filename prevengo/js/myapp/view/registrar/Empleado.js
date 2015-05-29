 Ext.define('myapp.view.registrar.Empleado', {
  extend : 'Ext.form.Panel',
  alias: 'widget.empleado',
    itemId: 'empleado',
    autoscroll:true,
  
  requires:['Ext.form.*','Ext.tip.QuickTipManager'],
  title : 'Registro de Empleado',
  initComponent: function() {
    var me   = this;
    me.items = me.buildItems();
    me.callParent(arguments);
  },
    buildItems : function(){
        return [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    layout: 'vbox',
                    items: [{
                        xtype: 'fieldset',
                        layout: 'vbox',
                        margin:'20 20 20 20',
                        width:700,
                        heigth:890,
                        itemId :'containerEmpleado',
                        title: 'Datos personales',
                        items: [{
                            xtype: 'container',
                            layout: 'vbox',
                            items:[{
                                xtype       : 'fieldcontainer',
                                fieldLabel  : 'Cédula',
                                labelWidth  : 150,
                                margins     : '0 0 0 17',
                                layout      :'hbox',
                                items:[{
                                    xtype: 'combobox',
                                    name: 'cmbnacionalidad',
                                    width: 80,
                                    value:'V',
                                    selecOnFocus: true,
                                    store: Ext.create('myapp.store.persona.nacionalidadStore'),
                                    valueField: 'nombre',
                                    displayField: 'nombre',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    editable:false
                                },{
                                xtype       : 'textfield',
                                name        : 'txtcedulaempleado',
                                hiddenLabel : true,
                                width       : 200,
                                vtype       : 'numero',
                                maxLength   : 8,
                                minLength   : 4,
                                allowBlank  : false,
                                accion      :'buscarEmpleado',
                            },{
                                xtype   : 'button',
                                iconCls : 'icon-buscar',
                                margins : '0 0 0 5',
                                tooltip :'Buscar',
                                name    :'btnbuscarempleado',
                            }]
                        },{
                          xtype   : 'form',
                          itemId    :'datosPersonalesdos',
                          border:false,
                          layout  :'vbox',
                            items:[{
                                xtype   : 'fieldset',
                                layout  :'vbox',
                                itemId    :'datosPersonales',
                                disabled:true,
                                border:0,
                                items:[{
                                  xtype       : 'textfield',
                                  fieldLabel  : 'Nombres',
                                  margins     : '0 0 0 10',
                                  width       : 655,
                                  name        :'nombres',
                                  vtype       : 'nombres',
                                  allowBlank  : false,
                                  labelWidth: 150
                              },{
                                xtype       : 'textfield',
                                fieldLabel  : 'Apellidos',
                                width       : 655,
                                labelWidth: 150,
                                name        :'apellidos',
                                vtype       : 'nombres',
                                margins     : '0 0 0 10',
                                allowBlank  : false
                            },{
                                xtype       : 'fieldcontainer',
                                layout      : 'hbox',
                                hiddenLabel : true,
                                items:[{
                                    xtype: 'datefield',
                                    width: 460,
                                    fieldLabel: 'Fecha de Nacimiento',
                                    format: "Y/m/d",
                                    name:'fechanacimiento',
                                    editable: false,
                                    margins     : '0 0 0 10',
                                    maxValue: new Date(),
                                    labelWidth: 150,
                                    hidden:false
                                },{
                                    xtype  : 'label',
                                    flex   : 1,
                                    itemId : 'edad',
                                    margins: '5 0 0 5',
                                    text   : 'Edad:  años.'
                                }]
                            },{
                                xtype       : 'textfield',
                                fieldLabel  : 'E-mail',
                                width       : 655,
                                margins     : '0 0 0 10',
                                labelWidth  : 150,
                                name        :'correo',
                                vtype       :'correo',
                                allowBlank  : false,
                            },{
                                xtype       : 'combobox',
                                fieldLabel  : 'Sexo:',
                                name        : 'sexo',
                                emptyText   :'Seleccionar',
                                editable    : false,
                                labelWidth: 150,
                                margins     : '0 0 0 10',
                                store       : Ext.create('myapp.store.persona.sexoStore'),
                                width       : 655,
                                valueField: 'id',
                                displayField: 'nombre',
      
                            },{
                                xtype       : 'combobox',
                                fieldLabel  : 'Estado:',
                                name        : 'cmbestado',
                                emptyText   :'Seleccionar',
                                editable    : false,
                                labelWidth: 150,
                                margins     : '0 0 0 10',
                                store       : Ext.create('myapp.store.persona.estadoStore'),
                                width       : 655,
                                valueField: 'id',
                                displayField: 'nombre',
      
                            },{
                                xtype       : 'combobox',
                                fieldLabel  : 'Municipio:',
                                name        : 'cmbmunicipio',
                                emptyText   :'Seleccionar',
                                disabled    : true,
                                editable    : false,
                                labelWidth: 150,
                                margins     : '0 0 0 10',
                                store       : Ext.create('myapp.store.persona.municipioStore'),
                                width       : 655,
                                valueField: 'id',
                                displayField: 'nombre',
      
                            },{
                                xtype       : 'combobox',
                                fieldLabel  : 'Parroquia:',
                                name        : 'cmbparroquia',
                                emptyText   :'Seleccionar',
                                disabled    : true,
                                editable    : false,
                                labelWidth: 150,
                                margins     : '0 0 0 10',
                                store       : Ext.create('myapp.store.persona.parroquiaStore'),
                                width       : 655,
                                valueField: 'id',
                                displayField: 'nombre',
      
                            },{
                                xtype       : 'fieldcontainer',
                                layout      : 'hbox',
                                margins     : '0 0 0 10',
                                labelWidth: 150,
                                fieldLabel  : 'Tlf Celular',
                                items:[{
                                    xtype       : 'combobox',
                                    width       : 80,
                                    hiddenLabel : true,
                                    name        : 'codTlf1',
                                    store       : Ext.create('myapp.store.telefono.CodCelularStore'),
                                    displayField:'codigo',
                                    valueField  :'codigo',
                                    editable    : false
                                },{
                                  xtype       : 'textfield',
                                  flex        : 1,
                                  allowBlank:false,
                                  width       : 420,
                                  name        : 'movil',
                                  minLength   : 7,
                                  maxLength   : 7,
                                  disabled    : true,
                                  maskRe: /[0-9]/,
                              }]
                            },{
                                xtype       : 'fieldcontainer',
                                layout      : 'hbox',
                                margins     : '0 0 0 10',
                                labelWidth: 150,
                                fieldLabel  : 'Tlf Local',
                                items:[{
                                    xtype       : 'combobox',
                                    width       : 80,
                                    hiddenLabel : true,
                                    name        : 'codTlf2',
                                    store       : Ext.create('myapp.store.telefono.CodLocalStore'),
                                    displayField:'codigo',
                                    valueField  :'codigo',
                                    editable    : false,
                                 },{
                                    xtype       : 'textfield',
                                    flex        : 1,
                                    width       : 420,
                                    name        : 'local',
                                    minLength   : 7,
                                    maxLength   : 7,
                                    disabled    : true,
                                    allowBlank:false,
                                    vtype       : 'numero'
                                }]
                             }]
                        }]
                     }]
                }]
            },{
                xtype: 'fieldset',
                layout: 'vbox',
                disabled:true,
                width:700,
                height:130,
                itemId:'filsetnivelocupacional',
                margin:'0 20 0 20',
                title: 'Datos Ocupacionales',
                items: [{
                    xtype: 'combobox',
                    width:'100%',
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbtiponomina',
                    margins:'3 6 3 15',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.empleado.TipoNomina'),
                    allowBlank: false,
                    forceSelection:true,
                    fieldLabel: 'Tipo de Nomina'
                },{
                    xtype: 'combobox',
                     width:'100%',
                    labelWidth:150,
                    disabled:false,
                    name: 'cmbcargo',
                    margins:'3 6 3 15',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    emptyText:'Seleccione',
                    store: Ext.create('myapp.store.empleado.TipoCargo'),
                    allowBlank: false,
                    forceSelection:true,
                    fieldLabel: 'Tipo de Cargo'
                },{
                    xtype: 'combobox',
                    width:'100%',
                    labelWidth:150,
                    disabled:false,
                    //hidden:true,
                    name: 'cmbdepartamento',
                    margins:'3 6 3 15',
                    displayField: 'nombre',
                    valueField: 'id',
                    queryMode: 'local',
                    triggerAction: 'all',
                    store: Ext.create('myapp.store.empleado.Departamento'),
                    forceSelection:true,
                    fieldLabel: 'Departamento'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Status',
                    name: 'status', 
                    margins:'3 6 3 15',                    
                    width:'100%',
                    disabled:false,
                    hidden:true,
                    labelWidth:150,
                    queryMode: 'local',
                    store: Ext.create('myapp.store.seguridad.Status'),
                    valueField: 'id',
                    value:'Activo',
                    displayField: 'nombre',
                    selectOnFocus: true,    
                    forceSelection: true
                }]
            }]
           
            },{
        xtype: 'fieldset',
        title: 'Foto',
        itemId:'fotofilset',
        margin:'20 0 10 0',
        width: '36%',
        items: [{ 
            xtype: 'radiogroup',
            //hideLabel: true,
            align: 'center',
            name:'rdselfoto',
            allowBlank:false,
            disabled:true,
            width:'100%',
            pack: 'center',
            columns:4,
            items: [{
              xtype: 'radiofield',
              name:'seleccionfoto',
              boxLabel: 'Tomar Foto',
              inputValue: '1',
              style: 'margin-bottom: 20px',
              checked:false
            },{
              xtype: 'radiofield',
              name:'seleccionfoto',
              boxLabel: 'Buscar Foto',
              style: 'margin-bottom: 20px',
              inputValue: '2',
            },{
              xtype: 'radiofield',
              name:'seleccionfoto',
              boxLabel: 'Sin Foto',
              style: 'margin-bottom: 20px',
              inputValue: '3',
              checked:false
            },{
              xtype: 'radiofield',
              name:'seleccionfoto',
              boxLabel: 'Sin Cambios',
              style: 'margin-bottom: 20px',
              //hidden:true,
              inputValue: '4',
            }],
          },{
              xtype: 'filefield',
              fieldLabel: 'Foto Empleado',
              name: 'foto',
              margin:'0 0 9 0',
              fileUpload: true,
              hidden:true,
              allowBlank:true,
              disabled:true,
              itemId:'foto',
              width:'100%',
          },{
              xtype:'form',
              itemId:'fotografia',
              frame: true,
              disabled:true,
              hidden:true,
              border: false,
              width:'100%',
              layout: 'fit',
              height: 305,
              autoShow: true,
              html:'<center><embed id="webcam_movie" src="'+BASE_PATH+'js/plugins/JPEGCam/webcam.swf" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="300" height="250" name="webcam_movie" align="middle" wmode="opaque" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="shutter_enabled=1&shutter_url='+BASE_PATH+'js/plugins/JPEGCam/shutter.mp3&width=300&height=250&server_width=300&server_height=250" /></center>',
              items : [{
                xtype: 'hiddenfield',
                name: 'existeFoto',
                value: 0
              }],
              buttons:['->',{
                text: 'Configuración',
                action:'configurarCamara'
              }]
            },{
              xtype:'form',
              itemId:'fotografia1',
              frame: true,
              disabled:true,
              hidden:false,
              border: false,
              width:'100%',
              layout: 'fit',
              height: 305,
              autoShow: true,
              items : [{
                xtype: 'image',
                height: 150,
                width: 200,
                name:'fotoFrontal1',
                src: BASE_PATH+'imagen/foto/silueta.png'
              }]
            }]
          }]
        }]
    },
    dockedItems:[{
      xtype   : 'toolbar',
      dock    : 'bottom',
      height  : 40,
      width: '100%',
      items:[{
        xtype : 'tbfill'
      },{
        xtype   : 'button',
        iconCls : 'icon-buscar',
        text    : 'Catalogo',
        tooltip :'Catalogo Empleado',
        name    :'btncatalogoempleado',
    },{
        xtype   : 'button',
        iconCls :'icon-limpiar',
        name      :'limpiar',
        text    : 'Limpiar'
      },{
        xtype   : 'button',
        iconCls :'save',
        name      :'guardar',
        text    : 'Guardar',
        disabled:true,
        //formBind: true,
        scope   : this,
      }]
  }],
 
});