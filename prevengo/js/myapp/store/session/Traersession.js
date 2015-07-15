Ext.define('myapp.store.session.Traersession', {
    extend: 'Ext.data.Store',
    requires: ['myapp.model.session.Traersession' 
    ],
    model: 'myapp.model.session.Traersession', // #2
    proxy: { 
        type:'ajax', 
        url: BASE_URL+'login/login/traersession',
        reader: { 
            type: 'json', 
            root: 'data'   
        }  
    }
});