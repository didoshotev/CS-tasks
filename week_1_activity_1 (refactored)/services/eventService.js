const { Event } = require('../models/eventModel');
const { readData, getEvents, writeData } = require('./fsService');

const dataCollection = readData();
const dataEventsCollection = getEvents();

const createEvent = (title, isOnlyForAdults, price, visitors) => {

    const eventObject = new Event(title, isOnlyForAdults, price, visitors);

    dataEventsCollection.push({ ...eventObject });
    dataCollection.events = dataEventsCollection;
    writeData(dataCollection);

    console.log(`Created Event "${title}"`);
}

const deleteEventById = async (id) => {

    let newEventsCollection = dataEventsCollection.filter(item => item.id !== id);
    
    // if both arr have same length, that means no item has been filtered
    const hasOperationFailed = newEventsCollection.length === dataEventsCollection.length; 
    
    if (hasOperationFailed) {
    
        console.log('No such event ID!');
        return;
    }

    dataCollection.events = newEventsCollection;

    writeData(dataCollection);
    console.log('Successfully deleted event!');
}

const editEventById = async (id, title, isOnlyForAdults, price) => {
    const currentEvent = getEventById(id);

    if(!currentEvent) { return }

    const editedEvent = Object.assign(currentEvent, { title, isOnlyForAdults, price });
    const eventIndex = getEventIndexById(id);

    dataEventsCollection.splice(eventIndex, 1, editedEvent);
    dataCollection.events = dataEventsCollection;
    writeData(dataCollection);

    console.log('You successfully edited the event');
}


// --------
const getEventById = (id) => {
    
    const event = dataEventsCollection.find(event => event.id === id);
    event === undefined && console.log('No such event ID!');
    
    return event;
}

const getEventIndexById = (id) => {
    return dataEventsCollection.findIndex(event => event.id === id)
}

const addUserToEventVisitors = (event, userId) => {
    event.visitors.push(userId);
    return event.visitors;
}

module.exports = { createEvent, deleteEventById, editEventById, getEventById, addUserToEventVisitors, getEventIndexById }