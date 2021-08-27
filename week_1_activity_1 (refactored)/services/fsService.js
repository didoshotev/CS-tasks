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

const getEventById = (id) => {
    return getEvents().find(event => event.id === id); 
}

const getUserById = (id) => {
    return getUsers().find(user => user.id === id);
}

const checkIfEventExists = (id) => {
    return getEvents().find(event => event.id === id) ? true : false;
}

const checkIfUserExists = (fullName) => {
    return getUsers().find(user => user.fullName === fullName);
}

module.exports = { readData, writeData, getUsers, getEvents,
    checkIfEventExists, checkIfUserExists, getSystem,
    getEventById, getUserById
    }

