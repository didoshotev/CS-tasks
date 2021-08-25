const readline = require("readline");
const fs = require('fs');
const { readData, checkIfEventExists } = require('./service');
const { generateID, priceChecker, stringChecker, genderChecker, ageChecker, filterChecker } = require('./utils');

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

const main = () => {
    rl.question(
        `Hello, please enter a command you want to execute!\n\
    1) Create an event\n\
    2) Delete an event\n\
    3) Print all events\n\
    4) Edit an event\n\
    5) Add visitor to event \n\
    6) Exit\n\
    7) ${system.canAddEvents ? 'Disable adding events' : 'Enable adding events' }  \n\
    8) ${system.canAddVisitors ? 'Disable adding visitors' : 'Enable adding visitors' }\n\
    9) Print all non adults events\n\
    10) Print the most visited event\n\
    11) Print events with (*) for adults or (#) for non adults\n\
    12) Filter events\n\
    13) Delete visitor from event\n`,
        (answer) => {
            if (answer.trim() == 1) {
                if(!system.canAddEvents) {
                    console.log('Creating events is currently disabled!');
                    rl.close();
                    return;
                }
                createEvent();
            }

            else if (answer.trim() == 2) {
                rl.question('Provide unique ID identifier: ', (answer) => {
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    deleteEventById(answer);
                })

            } else if (answer.trim() == 3) {
                readDataPretty();
            } else if (answer.trim() == 4) {

                rl.question('Provide unique ID identifier: ', (answer) => {
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    editEventById(answer);
                })
            } else if (answer.trim() == 5) {
                if(!system.canAddVisitors) {
                    console.log('Adding new visitors is currently disabled');
                    rl.close();
                    return;
                }
                rl.question('Provide event unique ID identifier: ', (answer) => {
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    addEventVisitor(answer);
                })

            } else if (answer.trim() == 6) {
                rl.close();
            } else if (answer.trim() == 7) {
                system.changeAddEventsStatus();
                changeSystemStatus('events')
                console.log(`${!system.canAddEvents ? 'Adding events DISABLED' : 'Adding events ENABLED' }`);
                rl.close()
            } else if (answer.trim() == 8) {
                system.changeAddVisitorsStatus();
                changeSystemStatus('visitors')
                console.log(`${!system.canAddVisitors ? 'Adding visitors DISABLED' : 'Adding visitors ENABLED' }`);
                rl.close()
            } else if(answer.trim() == 9) {
                readNonAdultsEvents();
                rl.close();
            } else if(answer.trim() == 10) {
                readMostVisitedEvent();
                rl.close();
            } else if(answer.trim() == 11) {
                readGroupedEvents();
                rl.close();
            } else if(answer.trim() == 12) {
                handleFilterInput();
            } else if(answer.trim() == 13) {
                
                rl.question('Provide event unique ID identifier: ', (answer) => {
                    if (!proceedIfEventDoesNotExists(answer)) { return }
                    deleteEventVisitor(answer);
                })
            }
        })
}

function askQuestion(theQuestion, validateInputFnc) {
    return new Promise((resolve, reject) => rl.question(theQuestion, answer => {
        if (validateInputFnc) {
            const result = validateInputFnc(answer);
            if (result.message) {
                console.error(result.message)
                rl.close();
                return;
            }
        }
        return resolve(answer);
    }))
}

// title, isOnlyForAdults, id, price, clients
const createEvent = async () => {
    const event = {};
    const eventName = await askQuestion('Please provide the name of the event: ', stringChecker);
    const price = await askQuestion('Price of the event: ', priceChecker)
    let isOnlyForAdults;
    rl.question('Can people under 18 years old attend the event(Any answer except "no" is threated as "yes"): ', answer => {
        answer = answer.trim().toLowerCase();

        if (answer === 'no') {

            isOnlyForAdults = false;
            rl.close();

        } else {

            isOnlyForAdults = true;
            rl.close();
        }
    })
    rl.on('close', () => {
        let id = generateID();

        console.log('successfully created event');
        event['title'] = eventName;
        event['isOnlyForAdults'] = isOnlyForAdults;
        event['id'] = id;
        event['price'] = +price
        event['visitors'] = [];

        const dataEventsCollection = readData();
        dataEventsCollection.events.push(event);
        fs.writeFileSync('db.json', JSON.stringify(dataEventsCollection));
        console.log(`Created Event "${eventName}"`);
        return event;
    })
}

const deleteEventById = async (id) => {
    const dataEventsCollection = readData();

    let newEventCollection = dataEventsCollection.events.filter(item => item.id !== id);
    dataEventsCollection.events = newEventCollection
    fs.writeFileSync('db.json', JSON.stringify(dataEventsCollection))

    console.log('Successfully deleted event!');
    rl.close();
}

const editEventById = async (id) => {
    const dataEventsCollection = readData();
    const eventToEdit = dataEventsCollection.events.find(item => item.id === id);
    console.log(`You are currently editing\nEvent title: ${eventToEdit.title}\n\
    Only allowed for adults (18+): ${eventToEdit ? 'Yes' : 'No'}\n\
    `);

    const eventName = await askQuestion('New event name: ', stringChecker);
    const price = await askQuestion('New event price: ', priceChecker);
    let isOnlyForAdults;
    rl.question('Can people under 18 years old attend the event(Any answer except "no" is threated as "yes"): ', answer => {
        answer = answer.trim().toLowerCase();

        if (answer === 'no') {

            isOnlyForAdults = false;
            rl.close();

        } else {

            isOnlyForAdults = true;
            rl.close();
        }
    })

    rl.on('close', () => {
        const newEventObject = {}
        newEventObject["title"] = eventName;
        newEventObject["price"] = price;
        newEventObject["isOnlyForAdults"] = isOnlyForAdults

        const mergedObject = Object.assign(eventToEdit, newEventObject);

        const eventIndex = dataEventsCollection.events.findIndex(item => item.id === id);
        dataEventsCollection.events.splice(eventIndex, 1, mergedObject);
        fs.writeFileSync('db.json', JSON.stringify(dataEventsCollection));

        console.log('You successfully edited the event');
        rl.close();
    })
}

const readDataPretty = () => {
    const dataEventsCollection = readData();
    dataEventsCollection.events.map((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
    })
    rl.close();
}

const addEventVisitor = async (eventId) => {
    const dataEventsCollection = readData();
    const eventToEdit = dataEventsCollection.events.find(item => item.id === eventId);

    console.log('Please fill the necessary information down below in order to sign a new visitor\n');

    const user = {};

    const fullName = await askQuestion('Enter visitor full name: ', stringChecker);
    const gender = await askQuestion('Enter visitor gender: ', genderChecker);
    const age = await askQuestion('Enter visitor age: ', ageChecker);

    user['fullName'] = fullName;
    user['gender'] = gender;
    user['age'] = +age;

    if (eventToEdit.isOnlyForAdults) {
        if (age < 18) {
            console.log(`You must have 18 years in order to visit event: ${eventToEdit.title}`);
            rl.close();
            return;
        }
    }

    eventToEdit.visitors.push(user);

    const eventIndex = dataEventsCollection.events.findIndex(item => item.id === eventId);
    dataEventsCollection.events.splice(eventIndex, 1, eventToEdit);
    fs.writeFileSync('db.json', JSON.stringify(dataEventsCollection));
    console.log('You successfully edited the event');
    rl.close();
}

const deleteEventVisitor = async (eventId) => {
    const dataEventsCollection = readData().events;
    const userToDeleteFullName = await askQuestion('Enter the visitor full name: ', stringChecker);
    let eventTitle

    dataEventsCollection.map(event => {
        if(event.id === eventId) {
            eventTitle = event.title;
            const visitorToDeleteIndex = event.visitors.findIndex(visitor => visitor.fullName === userToDeleteFullName);
            event.visitors.splice(visitorToDeleteIndex, 1);
        }
    })

    fs.writeFileSync('db.json', JSON.stringify(dataEventsCollection));
    console.log(`Successfully deleted a ${userToDeleteFullName} from ${eventTitle}`);
    rl.close();
}

const proceedIfEventDoesNotExists = (id) => {
    let isValidId = checkIfEventExists(id);
    if (!isValidId) {
        console.log('There is no event with such ID');
        rl.close();
        return
    }
    return true;
}

const changeSystemStatus = (type) => { // 'events' or 'visitors'
    const data = readData();
    const newDataSystem = {...data.system}
    
    type === 'events' && (newDataSystem.canAddEvents = !data.system.canAddEvents);
    type === 'visitors' && (newDataSystem.canAddVisitors = !data.system.canAddVisitors);

    data.system = newDataSystem;
    fs.writeFileSync('db.json', JSON.stringify(data))
}

const readNonAdultsEvents = () => {
    const dataEventsCollection = readData().events;
    console.log('Events only for non adults');
    dataEventsCollection.map((event, index) => {
        if(!event.isOnlyForAdults) {
            console.log(`${index}. ${event.title}`);
        }
    })
}

const readMostVisitedEvent = () => {
    const dataEventsCollection = readData().events;
    let currentMostVisitedEvent = 0; 
    let currentMostVisitedEventId = undefined;
    dataEventsCollection.map(event => {
        if(event.visitors.length > currentMostVisitedEvent) {
            currentMostVisitedEvent = event.visitors.length;
            currentMostVisitedEventId = event.id
        }
    })
    if(currentMostVisitedEventId) {
        let mostVisited = dataEventsCollection.find(event => event.id === currentMostVisitedEventId)
        console.log(`Most visited event is: "${mostVisited.title}"`);
    } else {
        console.log('Some of the events have equal visitors');
    }
}

const readGroupedEvents = () => {
    const dataEventsCollection = readData().events;
    dataEventsCollection.map(event => {
        if(event.isOnlyForAdults) {
            console.log(`* ${event.title}`);
        } else {
            console.log(`# ${event.title}`);
        }
    })
}

const handleFilterInput = async () => {
    const criteria = await askQuestion('Select "title" or "flag" to filter the events: ', filterChecker);
    const filterValue = await askQuestion(`Enter "${criteria}" value to filter events: `, stringChecker);
    // await readFilteredEvents(criteria, filterValue)
    criteria === 'title' && await filterByTitle(filterValue);
    rl.close();
    return;
}

const filterByTitle = async (value) => {
    const dataEventsCollection = readData().events;
    console.log(`Filtered by title: ${value}\n`);
    dataEventsCollection.map((event, index) => {
        if(event.title.includes(value)) {
            console.log(`${index + 1}. ${event.title}`);
        }
    })
}

const filterByFlag = async (value) => {
    const dataEventsCollection = readData().events;
    console.log(`Filtered by flag: ${value}\n`);
    dataEventsCollection.map((event, index) => {
        if(event.isOnlyForAdults) {
            console.log(`${index + 1}. ${event.title}`);
        }
    })
}
main();
