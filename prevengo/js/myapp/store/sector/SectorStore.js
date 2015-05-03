Ext.define('myapp.store.sector.SectorStore', {
    extend: 'Ext.data.Store',
    model: 'myapp.model.store.sector.SectorListaModel',
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'sector/sector/obtenerSector',
        reader: {
            type:'json', 
            root: 'data'
        }
    },
    autoLoad: true
});