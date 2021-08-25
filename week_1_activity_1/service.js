const fs = require('fs');

const readData = () => {
    let rawData           = fs.readFileSync('db.json');
    let eventsCollection  = JSON.parse(rawData);
    return eventsCollection;
}

const checkIfEventExists = (id) => {
    const dataEventsCollection = readData();
    let result = dataEventsCollection.events.find(event => event.id === id);
    if(result) {
        console.log('TRUEEEE');
        return true;
    } else { 
        return false;
    }
}

const createEvent = () => {

}
 
module.exports = { readData, checkIfEventExists }

