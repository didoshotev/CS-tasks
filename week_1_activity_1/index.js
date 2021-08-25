const readline = require("readline");
const { readData } = require('./FsService');

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

const { createUser } = require('./userService')(rl);

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
    proceedIfEventDoesNotExists
} = require('./service')(rl);


const main = () => {
    rl.question(
        `Hello, please enter a command you want to execute!\n\
    1) Create an event\n\
    2) Delete an event\n\
    3) Print all events\n\
    4) Edit an event\n\
    5) Add visitor to event \n\
    6) Exit\n\
    7) ${system.canAddEvents ? 'Disable adding events' : 'Enable adding events'}  \n\
    8) ${system.canAddVisitors ? 'Disable adding visitors' : 'Enable adding visitors'}\n\
    9) Print all non adults events\n\
    10) Print the most visited event\n\
    11) Print events with (*) for adults or (#) for non adults\n\
    12) Filter events\n\
    13) Delete visitor from event\n\
    14) Create user\n`,
        (answer) => {
            answer = answer.trim();

            if (answer == 1) {
                
                if (!system.canAddEvents) {
                    console.log('Creating events is currently disabled!');
                    rl.close();
                    return;
                }
                createEvent();
            }

            else if (answer == 2) {
                
                rl.question('Provide unique ID identifier: ', (answer) => {
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    deleteEventById(answer);
                })

            } else if (answer == 3) {
                readDataPretty();
            } else if (answer == 4) {

                rl.question('Provide unique ID identifier: ', (answer) => {
                    
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    editEventById(answer);
                })
            } else if (answer == 5) {
                
                if (!system.canAddVisitors) {
                    
                    console.log('Adding new visitors is currently disabled');
                    
                    rl.close();
                    return;
                }
               
                rl.question('Provide event unique ID identifier: ', (answer) => {
                    
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    
                    addEventVisitor(answer);
                })

            } else if (answer == 6) {
                rl.close();
            } else if (answer == 7) {
                
                system.changeAddEventsStatus();
                changeSystemStatus('events')
                console.log(`${!system.canAddEvents ? 'Adding events DISABLED' : 'Adding events ENABLED'}`);
                
                rl.close()
            } else if (answer == 8) {
                
                system.changeAddVisitorsStatus();
                changeSystemStatus('visitors')
                console.log(`${!system.canAddVisitors ? 'Adding visitors DISABLED' : 'Adding visitors ENABLED'}`);
                
                rl.close()
            } else if (answer == 9) {
                
                readNonAdultsEvents();
                
                rl.close();
            } else if (answer == 10) {

                readMostVisitedEvent();

                rl.close();
            } else if (answer == 11) {

                readGroupedEvents();

                rl.close();
            } else if (answer == 12) {
                handleFilterInput();
            } else if (answer == 13) {

                rl.question('Provide event unique ID identifier: ', (answer) => {

                    if (!proceedIfEventDoesNotExists(answer)) { return }

                    deleteEventVisitor(answer);
                })
            } else if(answer == 14) {
                createUser();
            } else {
                console.log('No such command!');
                rl.close();
                return
            }
        })
}

main();
