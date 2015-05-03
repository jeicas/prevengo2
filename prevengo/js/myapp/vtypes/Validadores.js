
Ext.define('myapp.vtypes.Validadores', {
	init: function () {
		var me = this;
		this.correoFn();
		this.numeroFn();
    this.pesoFn();
    this.nombresFn();
    this.dateRangeFn();
		this.passwordFn();
		this.letraFn(),
		this.showcolorFn()
	},
    correoFn:function () {
       var me = this;
        Ext.apply(Ext.form.field.VTypes, {
        	correo : function(value, field) {
        		return /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(value);
       		},
       		correoText : 'No es un correo Valido,debe tener el formato eje',
       }); 
    },
    numeroFn:function () {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
           numero : function(value, field) {
		    return /[0-9]/.test(value);
		   },
		   numeroText : 'Los datos ingresado no son válidos. Solo números',
		   numeroMask : /[0-9]/,
  		 }); 
    },
     pesoFn:function () {
        var me = this;
        Ext.apply(Ext.form.field.VTypes, {
           peso : function(value, field) {
        return /[0-9]/.test(value);
       },
       pesoText : 'Los datos ingresado no son válidos. Solo números',
       pesoMask : /[0-9.]/i,
       }); 
    },
    passwordFn: function(){
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
        password: function(val, field,action) {
          var win = field.up('window');
          formPanel = win.down('form');
          formPanel1= win.down('toolbar');
          if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
            formPanel1.down('button[name=guardar]').enable(true);
          }  
        return true.test(val);
        formPanel1.down('button[name=guardar]').enable(true); 
        },
      passwordText: 'No coincide con la Nueva Contraseña,por favor verificar',
      }); 
    },
    letraFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
    letra : function(value, field) {
	    return /[A-Za-z]/.test(value);
	   },
	   letraText : 'Los datos ingresado no son válidos. Solo letras',
	   letraMask : /[A-Za-z]/,
		 }); 
    },

    nombresFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
    nombres : function(value, field) {
      return /[A-Za-z ]/.test(value);
     },
     nombresText : 'Los datos ingresado no son válidos. Solo letras',
     nombresMask : /[A-Za-z ]/,
     }); 
    },
    showcolorFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
    showcolor: function(value,metaData){
      metaData.attr = value?'style="color:#f00"':'style="color:#0a0"';
    return value?'Activo':'Inactivo';
    },
    }); 
   },
   dateRangeFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
        daterange: function(val, field) {
            var date = field.parseDate(val);
            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                this.dateRangeMax = date;
                start.validate();   
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                this.dateRangeMin = date;
                end.validate();         
            }
            return true;
        }
    });
   }
   
});

