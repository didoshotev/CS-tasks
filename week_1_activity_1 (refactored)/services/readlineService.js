const { priceChecker, stringChecker, genderChecker, ageChecker, isOnlyForAdultsChecker } = require('../utils/utils');
const { processCreateUser, addUserToEvent, deleteUserFromEvent } = require('./userService')
const { createEvent, deleteEventById, editEventById, filterEventsByGender,
    readGroupedEvents, readMostVisitedEvents, readNonAdultsEvents } = require('./eventService');
const { changeSystemStatus } = require('./systemService');
const { questionsMatcher } = require('../utils/textMatcher');


const GlobalReference = require('../globals');


function readlineService(readline) {

    // helper
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

    const handleCreateUserData = async() => {

        const fullName = await askQuestion(questionsMatcher.USER_FULLNAME, stringChecker);
        const age      = parseInt(await askQuestion(questionsMatcher.USER_AGE, ageChecker));
        const budget   = parseFloat(await askQuestion(questionsMatcher.USER_BUDGET, priceChecker));
        const gender   = await askQuestion(questionsMatcher.USER_GENDER, genderChecker);

        await processCreateUser(fullName, age, budget, gender);
        return readline.close();
    };

    const handleCreateEventData = async() => {
       
        const canSystemCreateEvent = GlobalReference.System.checkAddEventsStatus()
        if(!canSystemCreateEvent) { return readline.close(); }

        const eventName             = await askQuestion(questionsMatcher.EVENT_NAME, stringChecker);
        const price                 = parseFloat(await askQuestion(questionsMatcher.EVENT_PRICE, priceChecker));
        const isOnlyForAdultsAnswer = await askQuestion(questionsMatcher.EVENT_IS_FOR_ADULTS);
        
        const isOnlyForAdults       = isOnlyForAdultsChecker(isOnlyForAdultsAnswer);
        
        await createEvent(eventName, isOnlyForAdults, price);
        return readline.close();
    };

    const handleDeleteEvent = async() => {

        const eventId = await askQuestion(questionsMatcher.EVENT_ID, stringChecker);
        await deleteEventById(eventId);
        
        return readline.close();
    };

    const handleEditEvent = async() => {

        const eventId               = await askQuestion(questionsMatcher.EVENT_ID, stringChecker);
        const eventName             = await askQuestion(questionsMatcher.EVENT_NAME, stringChecker);
        const price                 = parseFloat(await askQuestion(questionsMatcher.EVENT_PRICE, priceChecker));
        const isOnlyForAdultsAnswer = await askQuestion(questionsMatcher.EVENT_IS_FOR_ADULTS);
        
        const isOnlyForAdults       = isOnlyForAdultsChecker(isOnlyForAdultsAnswer);

        await editEventById(eventId, eventName, isOnlyForAdults, price);

        return readline.close();
    };

    const handleAddVisitor = async() => {

        const canSystemAddVisitor = GlobalReference.System.checkAddVisitorsStatus();
        if(!canSystemAddVisitor) { return readline.close(); }

        const eventId = await askQuestion(questionsMatcher.EVENT_ID, stringChecker);
        const userId  = await askQuestion(questionsMatcher.USER_ID, stringChecker);

        await addUserToEvent(eventId, userId);
        
        return readline.close();
    };

    const handleDeleteVisitor = async() => {

        const eventId = await askQuestion(questionsMatcher.EVENT_ID, stringChecker);
        const userId  = await askQuestion(questionsMatcher.USER_ID, stringChecker);

        await deleteUserFromEvent(eventId, userId);

        return readline.close();
    };

    const handleFilterEventsByGender = async() => {

        const eventId        = await askQuestion(questionsMatcher.EVENT_ID, stringChecker);
        const genderToFilter = await askQuestion(questionsMatcher.EVENT_GENDER_FILTER, genderChecker);

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

    const handleQuit = async() => {
        
        console.log('See you later!');
        readline.close()
    }

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
        handleChangeAddVisitorsStatus,
        handleQuit
    }
}

module.exports = readlineService