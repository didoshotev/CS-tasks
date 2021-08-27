const readline = require("readline");
const GlobalReference = require("./globals");
const { readData } = require('./services/fsService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const system = {
    canAddEvents: readData().system.canAddEvents,
    canAddVisitors: readData().system.canAddVisitors,
    changeAddEventsStatus: () => {
        system.canAddEvents = !system.canAddEvents;
    },
    changeAddVisitorsStatus: () => {
        system.canAddVisitors = !system.canAddVisitors;
    }
}

const ReadlineService = require('./services/readlineService')(rl);



const { createEvent,
    deleteEventById,
    deleteEventVisitor,
    addEventVisitor,
    readDataPretty,
    readFilteredByTitle,
    readGroupedEvents,
    readMostVisitedEvent,
    readNonAdultsEvents,
    editEventById,
    handleFilterInput,
    filterByFlag,
    changeSystemStatus,
    proceedIfEventDoesNotExists,
    addUserToEvent,
    filterEventVisitorsByGender
} = require('./services/service')(rl);


const main = () => {
    rl.question(
        `Hello, please enter a command you want to execute!\n\
    1) Create an event\n\
    2) Delete an event\n\
    3) Print all events\n\
    4) Edit an event\n\
    5) Add visitor to event \n\
    6) Exit\n\
    7) ${GlobalReference.System.canAddEvents ? 'Disable adding events' : 'Enable adding events'}  \n\
    8) ${GlobalReference.System.canAddVisitors ? 'Disable adding visitors' : 'Enable adding visitors'}\n\
    9) Print all non adults events\n\
    10) Print the most visited event\n\
    11) Print events with (*) for adults or (#) for non adults\n\
    12) Filter events\n\
    13) Delete visitor from event\n\
    14) Create user\n\
    15) Filter event visitors by gender\n\
    16) Check system status\n`,
        (answer) => {
            answer = answer.trim();

            if (answer == 1) {
                if (!system.canAddEvents) {
                    console.log('Creating events is currently disabled!');
                    return rl.close();
                }
                ReadlineService.handleCreateEventData();
            }

            else if (answer == 2) {

                ReadlineService.handleDeleteEvent();

            } else if (answer == 3) {
                
                readDataPretty();
            
            } else if (answer == 4) {
            
                ReadlineService.handleEditEvent();
                
            } else if (answer == 5) {

                ReadlineService.handleAddVisitor();

            } else if (answer == 6) {
                rl.close();
            } else if (answer == 7) {

                ReadlineService.handleChangeAddEventsStatus();

            } else if (answer == 8) {

                ReadlineService.handleChangeAddVisitorsStatus();

                
            } else if (answer == 9) {

                ReadlineService.handleReadNonAdultsEvents();

            } else if (answer == 10) {

                ReadlineService.handleReadMostVisitedEvents();
               
            } else if (answer == 11) {

                ReadlineService.handleReadGroupedEvents();

            } else if (answer == 12) {

                handleFilterInput();

            } else if (answer == 13) {

                ReadlineService.handleDeleteVisitor();

            } else if (answer == 14) {
                ReadlineService.handleCreateUserData();

            } else if(answer == 15) {
                
                ReadlineService.handleFilterEventsByGender();
                
            } else if(answer == 16) {

                console.log(GlobalReference.System);
                rl.close();
            
            } else {
                console.log('No such command!');
                rl.close();
                return
            }
        })
}

main();
