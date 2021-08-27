const { readData, writeData, checkIfUserExists } = require('./fsService');
const { generateID, priceChecker, stringChecker, genderChecker, ageChecker, filterChecker, yesNoChecker } = require('../utils/utils');
const { processCreateUser, addUserToEvent, deleteUserFromEvent } = require('./userService')
const { createEvent, getEventById, deleteEventById, editEventById, filterEventsByGender, readGroupedEvents, readMostVisitedEvents, readNonAdultsEvents } = require('./eventService');
const { changeSystemStatus } = require('./systemService');

const GlobalReference = require('../globals');
const { System } = require('../globals');


function readlineService(readline) {

    function askQuestion(theQuestion, validateInputFnc) {
        return new Promise(resolve => readline.question(theQuestion, answer => {
            if (validateInputFnc) {
                const result = validateInputFnc(answer);
                if (result.message) {
                    console.error(result.message)
                    return readline.close();
                }
            }
            return resolve(answer);
        }))
    }

    // process input data
    const handleCreateUserData = async() => {

        const fullName = await askQuestion('Enter client full name: ', stringChecker);
        const age      = parseInt(await askQuestion('Enter client age: ', ageChecker));
        const budget   = parseFloat(await askQuestion('Enter client starting budget: ', priceChecker));
        const gender   = await askQuestion('Enter client gender: ', genderChecker);

        await processCreateUser(fullName, age, budget, gender);
        return readline.close();
    };

    const handleCreateEventData = async() => {
       
        const canSystemCreateEvent = GlobalReference.System.checkAddEventsStatus()
        if(!canSystemCreateEvent) { return readline.close(); }

        const eventName       = await askQuestion('Please provide the name of the event: ', stringChecker);
        const price           = parseFloat(await askQuestion('Price of the event: ', priceChecker));
        const isOnlyForAdultsAnswer = await askQuestion('Can people under 18 years old attend the event(Any answer except "no" is threated as "yes"): ', yesNoChecker);
        const isOnlyForAdults = isOnlyForAdultsAnswer === 'no' ? false : true;

        await createEvent(eventName, isOnlyForAdults, price);
        return readline.close();
    };

    const handleDeleteEvent = async() => {

        const eventId = await askQuestion('Provide unique event ID identifier: ', stringChecker);
        await deleteEventById(eventId);
        
        return readline.close();
    };

    const handleEditEvent = async() => {

        const eventId               = await askQuestion('Provide unique event ID identifier: ', stringChecker);
        const eventName             = await askQuestion('Please provide the name of the event: ', stringChecker);
        const price                 = parseFloat(await askQuestion('Price of the event: ', priceChecker));
        const isOnlyForAdultsAnswer = await askQuestion('Can people under 18 years old attend the event(Any answer except "no" is threated as "yes"): ', yesNoChecker);
        
        const isOnlyForAdults = isOnlyForAdultsAnswer === 'no' ? false : true;

        await editEventById(eventId, eventName, isOnlyForAdults, price);

        return readline.close();
    };

    const handleAddVisitor = async() => {

        const canSystemAddVisitor = GlobalReference.System.checkAddVisitorsStatus();
        if(!canSystemAddVisitor) { return readline.close(); }

        const eventId = await askQuestion('Provide event unique ID identifier: ', stringChecker);
        const userId = await askQuestion('Provide user unique ID identifier: ', stringChecker);

        await addUserToEvent(eventId, userId);
        
        return readline.close();
    };

    const handleDeleteVisitor = async() => {

        const eventId = await askQuestion('Provide event unique ID identifier: ', stringChecker);
        const userId = await askQuestion('Provide user unique ID identifier: ', stringChecker);

        await deleteUserFromEvent(eventId, userId);

        return readline.close();
    };

    const handleFilterEventsByGender = async() => {

        const eventId = await askQuestion('Provide event unique ID identifier: ', stringChecker);
        const genderToFilter = await askQuestion('Which gender you want to filter (m)/(f): ', genderChecker);

        await filterEventsByGender(eventId, genderToFilter);

        return readline.close()
    };

    const handleReadGroupedEvents = async() => {

        await readGroupedEvents();

        readline.close();
    };

    const handleReadMostVisitedEvents = async() => {

        await readMostVisitedEvents();

        readline.close();
    };

    const handleReadNonAdultsEvents = async () => {
        
        await readNonAdultsEvents();

        readline.close();
    }

    const handleChangeAddEventsStatus = async() => {

        GlobalReference.System.changeAddEventsStatus();
        await changeSystemStatus('events');

        readline.close();
    };

    const handleChangeAddVisitorsStatus = async() => {

        GlobalReference.System.changeAddVisitorsStatus();
        await changeSystemStatus('visitors');

        readline.close();
    };

    return {
        handleCreateUserData,
        handleCreateEventData,
        handleDeleteEvent,
        handleEditEvent,
        handleAddVisitor,
        handleDeleteVisitor,
        handleFilterEventsByGender,
        handleReadGroupedEvents,
        handleReadMostVisitedEvents,
        handleReadNonAdultsEvents,
        handleChangeAddEventsStatus,
        handleChangeAddVisitorsStatus
    }
}

module.exports = readlineService