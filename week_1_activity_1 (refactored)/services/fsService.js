const fs = require('fs');

const readData = () => {
    
    let rawData = fs.readFileSync('db.json');
    return JSON.parse(rawData);
}

const writeData = (dataCollection) => {
    fs.writeFileSync('db.json', JSON.stringify(dataCollection))
}

const getEvents = () => {
    return readData().events;
}

const getUsers = () => {
    return readData().users;
}

const getSystem = () => {
    return readData().system;
}


module.exports = { readData, writeData, getUsers, getEvents, getSystem }

