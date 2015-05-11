Ext.define('myapp.view.evento.WinReincidencia', {
extend: 'Ext.window.Window',
  alias: 'widget.winReincidencia',
  itemId: 'winReincidencia',
  title:'Evento',
  height: 370,
  width: 500,
  modal:true,
  requires: [
 
  ],
  layout: {
   	type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [
    {
            xtype: 'container',
            height: 318,
            width: 581,
            x:-15,
            y:-20,
            layout: 'absolute',
            items: [
                {
                    xtype: 'fieldset',
                    x: 30,
                    y: 30,
                    height: 150,
                    width: 450,
                    layout: 'absolute',
                    title: 'Datos de la Reincidencia',
                    items: [
                        {
                            xtype: 'textareafield',
                            x: 10,
                            y: 10,
                            height: 62,
                            width: 310,
                            fieldLabel: 'Descripción:',
                            name:'txtDescripcion'
                            
                        },
                        {
                            xtype: 'numberfield',
                            x: 10,
                            y: 90,
                            width: 310,
                            fieldLabel: 'Costo',
                            name:'txtCosto'
                        }
                    ]
                },
                {
                    xtype: 'image',
                    x: 400,
                    y: 200,
                    name:'img',
                    id:'img',
                    height: 80,
                    width: 80
                  },
                     
                {
                    xtype: 'fieldset',
                    x: 30,
                    y: 190,
                    height: 90,
                    width: 360,
                    layout: 'absolute',
                    title: 'Anexo',
                    items: [
                        {
                            xtype: 'filefield',
                            x: 10,
                            y: 20,
                            width: 320,
                            name:'btnSubirArchivo[]',
                            id:'btnSubirArchivo',
                            fieldLabel: 'Subir archivo:',
                            onChange: function()
                                   {
                                      previewImage(Ext.getCmp('btnSubirArchivo').getEl().down('input[type=file]').dom.files[0]);
                                   }
                 }

                       
                    ]
                }
            ]
        }
    ]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      height  : 40,
          width: '100%',
          items:[{
            xtype : 'tbfill'
          },
          {
            xtype   : 'button',
            iconCls :'save',
            name    :'btnGuardar',
            text    : 'Guardar',
            disabled:false,
            scope   : this,


          },{
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnLimpiar',
            text    : 'Limpiar'
          }]
     
    }]
  }
});

//// -----------Funciones para la vista previa de la imagen y validar la extension de los archivos.---------
var typeExtension="image";

function checkFileExtension(elem) {
       
        var filePath = elem;

        if(filePath.indexOf('.') == -1)
            return false;
                  
        var validExtensions = new Array();
        var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
      
        if (typeExtension=="image") {
         validExtensions[0] = 'jpg';
         validExtensions[1] = 'jpeg';
         validExtensions[3] = 'png';
         

        }
        
        for(var i = 0; i < validExtensions.length; i++) {
            if(ext == validExtensions[i])
                return true;
        }

        Ext.Msg.alert('Advertencia', 'La extension .'+ext+' del archivo ' + filePath + ' no es permitida!');
        
        if (typeExtension=="image") {
         document.getElementsByName('btnSubirArchivo[]')[0].value='';
         
        }
        
        return false;
    }




     function previewImage(input) {


      var typeExtension="image";
    if (!checkFileExtension(encodeURIComponent(document.getElementsByName("btnSubirArchivo[]")[0].value)))
    {
     return false;  
    }
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
         //cambiar imagenArea por el id de la imagen que se esta usando en el js. 
       document.getElementById('img').src = e.target.result
      }
      reader.readAsDataURL(input);
    }

   }
   //-----------------------------------------------------------------------------------------------------------------------