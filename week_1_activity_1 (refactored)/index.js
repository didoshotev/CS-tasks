const GlobalReference = require("./globals");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const {
    handleCreateEventData, handleDeleteEvent,
    handleEditEvent, handleAddVisitor, handleChangeAddEventsStatus,
    handleChangeAddVisitorsStatus, handleCreateUserData, handleDeleteVisitor,
    handleFilterEventsByGender, handleReadGroupedEvents, handleReadMostVisitedEvents,
    handleReadNonAdultsEvents, handleQuit
} = require('./services/readlineService')(readline);

const commandsFunctionsCollection = {
    1: handleCreateEventData,
    2: handleDeleteEvent,
    3: handleEditEvent,
    4: handleAddVisitor,
    5: handleChangeAddEventsStatus,
    6: handleChangeAddVisitorsStatus,
    7: handleReadNonAdultsEvents,
    8: handleReadMostVisitedEvents,
    9: handleReadGroupedEvents,
    10: handleDeleteVisitor,
    11: handleCreateUserData,
    12: handleFilterEventsByGender,
    13: handleQuit
}

const commandsCollection = [
    'Create an event', 'Delete an event', 'Edit an event', 'Add visitor to event',
    
    `${GlobalReference.System.canAddEvents ? 
        `Disable adding ${GlobalReference.DB_EVENTS_COLL_NAME}` : `Enable adding ${GlobalReference.DB_EVENTS_COLL_NAME}`}`,
    
    `${GlobalReference.System.canAddVisitors ? 
        `Disable adding ${GlobalReference.DB_VISITORS_COLL_NAME}` : `Enable adding ${GlobalReference.DB_EVENTS_COLL_NAME}`}`,
    
        'Print all non adults events', 'Print the most visited event', 'Print events with (*) for adults or (#) for non adults',
    'Delete visitor from event', 'Create user', `Filter event ${GlobalReference.DB_VISITORS_COLL_NAME} by gender`, 'Quit'
]

const main = () => {
    console.log('Hello, please enter the command you want to execute!');

    readline.question(`${printCommands(commandsCollection)}`, (answer) => {
        
        answer = parseInt(answer.trim());
        
        const isValidAnswer = answer in commandsFunctionsCollection; 

        isValidAnswer ? commandsFunctionsCollection[answer]() : (console.log('Invalid command!'), readline.close()); 
    })
}

function printCommands(commandsArray) {

    for (let i = 0; i < commandsArray.length; i++) {
        console.log(`${i + 1}) ${commandsArray[i]}`);
    }
    return '\nCommand number: ';
}

main();
