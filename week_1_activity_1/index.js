const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = () => {
    rl.question('Hello, please enter a command you want to execute!\n1) Create an event\n2) exit\n', (answer) => {
        if(answer.trim() == 1) {
            createEvent()
        } else if (answer.trim() == 2) {
            rl.close();
        }
    })
}


function askQuestion(theQuestion) {
    return new Promise(resolve => rl.question(theQuestion, answer => {
        if(!answer) {
            throw new TypeError("Wrong credentials");
        }
        return resolve(answer);
    }))
}

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
        let id = Math.random() * 16
        console.log('successfully created event');
        event['title'] = eventName;
        event['isOnlyForAdults'] = isOnlyForAdults;
        event['id'] = id;
        
        console.log(`Created Event "${eventName}"`);
        return event;
    })
}

main();
