'use strict';
const readline = require("readline");
const fs = require('fs');
const { readData } = require('./service');
const { generateID } = require('./utils');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = () => {
    rl.question(
    'Hello, please enter a command you want to execute!\n\
    1) Create an event\n\
    2) Delete an event\n\
    3) print all events\n\
    4) exit\n',
    (answer) => {
        if (answer.trim() == 1) {
            createEvent();
        }

        else if (answer.trim() == 2) {
            // _e0ec2qs22
            rl.question('Provide unique ID identifier: ', (answer) => {
                deleteEventById(answer);
            })

        } else if (answer.trim() == 3) {

            readDataPretty();
        
        } else if (answer.trim() == 4) {
            rl.close();
        }
    })
}

// readData();
// rl.close();

function askQuestion(theQuestion) {
    return new Promise(resolve => rl.question(theQuestion, answer => {
        if (!answer) {
            throw new TypeError("Wrong credentials");
        }
        return resolve(answer);
    }))
}

// title, isOnlyForAdults, id, price, clients
const createEvent = async () => {
    const event = {};
    const eventName = await askQuestion('Please provide the name of the event: ');
    let isOnlyForAdults;
    rl.question('Can people under 18 years old attend the event: (yes) or (no): ', answer => {
        answer = answer.trim().toLowerCase();

        if (answer === 'yes') {

            isOnlyForAdults = true;
            rl.close();

        } else if (answer === 'no') {

            isOnlyForAdults = false;
            rl.close();

        } else {

            rl.setPrompt('Incorrect response please try again: ')
            rl.prompt();
            rl.on('line', (answer) => {

                answer = answer.trim().toLocaleLowerCase()
                if (answer === 'yes') {

                    isOnlyForAdults = true;
                    rl.close();

                } else if (answer === 'no') {

                    isOnlyForAdults = false;
                    rl.close();

                } else {

                    rl.setPrompt(`Your input "${answer}" is incorrect please try again: `);
                    rl.prompt();
                }
            })
        }
    })
    rl.on('close', () => {
        let id = generateID();

        console.log('successfully created event');
        event['title'] = eventName;
        event['isOnlyForAdults'] = isOnlyForAdults;
        event['id'] = id;
        event['price'] = 0
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

const readDataPretty = () => {
    const dataEventsCollection = readData();
    dataEventsCollection.events.map((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
    })
    rl.close();
}

main();
