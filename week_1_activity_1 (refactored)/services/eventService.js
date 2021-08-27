const { Event } = require('../models/eventModel');
const { readData, getEvents, writeData, getUsers } = require('./fsService');
const GlobalReference = require('../globals');

const dataCollection = readData();
const dataEventsCollection = getEvents();
const dataUsersCollection = getUsers();

const createEvent = (title, isOnlyForAdults, price, visitors) => {

    const eventObject = new Event(title, isOnlyForAdults, price, visitors);

    const dataEventsCollectionModified = [ ...dataEventsCollection, { ...eventObject } ];
    dataCollection.events = dataEventsCollectionModified;
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

    if (!currentEvent) { return }

    const editedEvent = { ...currentEvent, title, isOnlyForAdults, price}
    const eventIndex = getEventIndexById(id);

    dataEventsCollection.splice(eventIndex, 1, editedEvent);
    dataCollection.events = dataEventsCollection;
    writeData(dataCollection);

    console.log('You successfully edited the event');
}

const filterEventsByGender = async (eventId, genderToFilter) => {

    const currentEvent = getEventById(eventId);

    if (!currentEvent) { return }

    genderToFilter === GlobalReference.genderEnum.MALE && console.log(`All male clients visiting "${currentEvent.title}" are:`);
    genderToFilter === GlobalReference.genderEnum.FEMALE && console.log(`All female clients visiting "${currentEvent.title}" are:`);

    currentEvent[GlobalReference.DB_VISITORS_COLL_NAME].map(visitorID => {

        const currentUser = dataUsersCollection.find(user => user.id === visitorID);

        const isValidUser = currentUser && genderToFilter === currentUser.gender;
        isValidUser && console.log(currentUser.fullName);

    })
}

const readGroupedEvents = async () => {

    dataEventsCollection.map(event => {
        console.log(`${checkAdultSymbol(event.isOnlyForAdults)} ${event.title}`);
    })
}

const readMostVisitedEvents = async () => {

    let currentMostVisitedEvent = 0;
    let currentMostVisitedEventId = undefined;

    dataEventsCollection.map(event => {

        if (event.visitors.length > currentMostVisitedEvent) {

            currentMostVisitedEvent = event.visitors.length;
            currentMostVisitedEventId = event.id
        }
    })

    if (currentMostVisitedEventId) {

        let mostVisited = dataEventsCollection.find(event => event.id === currentMostVisitedEventId)
        console.log(`Most visited event is: "${mostVisited.title}"`);
        return;
    }
    console.log('Some of the events have equal visitors');
}

const readNonAdultsEvents = () => {
    
    console.log('Events only for non adults');
    
    dataEventsCollection.map(event => {
        !event.isOnlyForAdults && console.log(`- ${event.title}`); 
    })
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
    return [...event[GlobalReference.DB_VISITORS_COLL_NAME], userId ];
}

const checkAdultSymbol = (isOnlyForAdults) => {
    return isOnlyForAdults ? '*' : '#';
}

module.exports = {
    createEvent, deleteEventById, editEventById,
    getEventById, addUserToEventVisitors, getEventIndexById,
    filterEventsByGender, readGroupedEvents, readMostVisitedEvents,
    readNonAdultsEvents
}