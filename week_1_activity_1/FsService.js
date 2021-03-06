const fs = require('fs');

const readData = () => {
    let rawData           = fs.readFileSync('db.json');
    let eventsCollection  = JSON.parse(rawData);
    
    return eventsCollection;
}

const writeData = (dataCollection) => {
    fs.writeFileSync('db.json', JSON.stringify(dataCollection))
}

const checkIfEventExists = (id) => {
    const dataEventsCollection = readData();
    
    let result = dataEventsCollection.events.find(event => event.id === id);
    
    if(result) { return true } 
    return false;
}

const checkIfUserExists = (fullName) => {
    const dataUsersCollection = readData().users;

    let result = dataUsersCollection.find(user => user.fullName === fullName);

    if(result) { return true } 
    return false;
}

module.exports = { readData, writeData, checkIfEventExists, checkIfUserExists }

