const { readData, writeData, getUsers, getEvents } = require('./fsService');
const { User } = require('../models/userModel');
const { getEventById, getEventIndexById } = require('./eventService');
const GlobalReference = require('../globals');

const dataCollection = readData();
const dataUserCollection = getUsers();
const dataEventsCollection = getEvents();

const processCreateUser = async (fullName, age, budget, gender) => {

    const userObject = new User(fullName, age, budget, gender);

    const dataUserCollectionModified = [...dataUserCollection, { ...userObject }]
    dataCollection.users = dataUserCollectionModified;
    writeData(dataCollection);

    console.log('Successfully created user!');
};

const addUserToEvent = async (eventId, userId) => {

    const currentEvent = getEventById(eventId);
    const currentEventIndex = getEventIndexById(eventId);
    const currentUser = getUserById(userId);
    const currentUserIndex = getUserIndexById(userId);

    if (!currentUser || !currentEvent) { return }

    if (currentEvent.isOnlyForAdults) {
        if (!checkIfUserIsAged(currentUser.age)) {
            console.log('need 18 brother!');
            return
        }
    }


    if(checkIfUserExistsInEvent(currentEvent, currentUser.id)) {
        console.log(`${currentUser.fullName} is already added to ${currentEvent.title}!`);
        return;
    }

    const currentUserUpdated = { ...currentUser };
    const currentEventUpdated = { ...currentEvent };

    updateUserVipStatus(currentUserUpdated);

    currentEventUpdated.visitors = [ ...currentEventUpdated.visitors, currentUserUpdated.id ];
    dataEventsCollection.splice(currentEventIndex, 1, currentEventUpdated);

    if(currentUserUpdated.budget < currentEvent.price && !currentUserUpdated.isVip) {
        console.log(`You don't have enought budget to visit event: ${currentEvent.title}`);
        return
    }

    !currentUser.isVip && (currentUserUpdated.budget -= currentEvent.price);

    dataUserCollection.splice(currentUserIndex, 1, currentUserUpdated);
    
    dataCollection.users = dataUserCollection;
    dataCollection.events = dataEventsCollection;

    writeData(dataCollection);
    console.log('Successfully added user!');
}

const deleteUserFromEvent = async (eventId, userId) => {

    const currentEvent = getEventById(eventId);
    const currentUser = getUserById(userId);

    let deleteChecker = false;

    if (!currentUser || !currentEvent) { return }

    if(!checkIfUserExistsInEvent(currentEvent, currentUser.id)) {
        console.log(`${currentUser.fullName} can't be found in ${currentEvent.title}!`);
        return;
    }

    dataEventsCollection.map(event => {
        if(event.id === currentEvent.id) {
            const userToDeleteIndex = event.visitors.findIndex(visitor => visitor.id === currentUser.id);
            event.visitors.splice(userToDeleteIndex, 1);
            deleteChecker = true;
        }
    })

    if(deleteChecker) {
        console.log(`Successfully deleted user: ${currentUser.fullName}`);
        dataCollection.events = dataEventsCollection;
        writeData(dataCollection);
        return;
    }
    console.log(`No such user attending ${currentEvent.title}!`);

}

const getUserById = (id) => {

    const user = dataUserCollection.find(user => user.id === id);
    user === undefined && console.log('No such user ID!');
    return user;
};

const getUserIndexById = (id) => {
    return dataUserCollection.findIndex(user => user.id === id)
};

const checkIfUserIsAged = (userAges) => {
    return userAges > GlobalReference.USER_MIN_ADULT_AGE ? true : false;
}

const checkIfUserExistsInEvent = (event, userId) => {
    return event.visitors.length === 0 ? false : event.visitors.includes(userId);
}

const checkIfUserIsVip = (user) => {
    return user.activeEvents === GlobalReference.USER_VIP_NUMBER;
}

const updateUserVipStatus = (user) => {
    if (checkIfUserIsVip(user)) {
        user.isVip = true;
        user.activeEvents = 0;
    } else {
        user.isVip = false;
        user.activeEvents++;
    }
}

module.exports = { processCreateUser, addUserToEvent, deleteUserFromEvent }