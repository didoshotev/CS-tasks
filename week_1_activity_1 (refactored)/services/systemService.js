const GlobalReference = require("../globals");
const { getSystem, writeData, readData } = require("./fsService");


const dataCollection = readData();
const dataSystemCollection = getSystem();


const changeSystemStatus = (type) => {

    const dataSystemCollectionModified = {...dataSystemCollection};
   
    type === GlobalReference.DB_EVENTS_COLL_NAME &&
        (dataSystemCollectionModified.canAddEvents = !dataSystemCollectionModified.canAddEvents);
    
    type === GlobalReference.DB_VISITORS_COLL_NAME &&
        (dataSystemCollectionModified.canAddVisitors = !dataSystemCollectionModified.canAddVisitors);

    dataCollection.system = dataSystemCollectionModified;
    writeData(dataCollection);
    
    console.log('Successfully updated the System Status');
}

module.exports = { changeSystemStatus }