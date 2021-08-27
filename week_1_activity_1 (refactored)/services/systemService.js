const { getSystem, writeData, readData } = require("./fsService");
const GlobalReference = require('../globals');


const dataCollection = readData();
const dataSystemCollection = getSystem();


const changeSystemStatus = (type) => {

    const dataSystemCollectionModified = {...dataSystemCollection};
   
    type === 'events' && (dataSystemCollectionModified.canAddEvents = !dataSystemCollectionModified.canAddEvents);
    type === 'visitors' && (dataSystemCollectionModified.canAddVisitors = !dataSystemCollectionModified.canAddVisitors);

    dataCollection.system = dataSystemCollectionModified;
    writeData(dataCollection);
    console.log('Successfully updated the System Status');
}

module.exports = { changeSystemStatus }