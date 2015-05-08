Ext.define('myapp.store.division.DivisionStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.generico.GenericoModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'division/division/obtenerDivision',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});