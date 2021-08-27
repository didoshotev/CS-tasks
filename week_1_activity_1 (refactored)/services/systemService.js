const { getSystem, writeData, readData } = require("./fsService");

const dataCollection = readData();
const dataSystemCollection = getSystem();


const changeSystemStatus = (type) => {

    const newDataSystem = {...dataSystemCollection};
    
    type === 'events' && (newDataSystem.canAddEvents = !newDataSystem.canAddEvents);
    type === 'visitors' && (newDataSystem.canAddVisitors = !newDataSystem.canAddVisitors);

    dataCollection.system = newDataSystem;
    writeData(data);
}