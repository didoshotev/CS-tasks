const fs = require('fs');

const readData = () => {
    let rawData           = fs.readFileSync('db.json');
    let eventsCollection  = JSON.parse(rawData);
    return eventsCollection;
}

const createEvent = () => {

}
 
module.exports = { readData }

