const { readData, writeData, checkIfUserExists } = require('./FsService');
const { generateID, priceChecker, stringChecker, genderChecker, ageChecker, filterChecker } = require('./utils');

function userService(rl) {

    const { askQuestion } = require('./service')(rl);
    const dataCollection = readData();

    const createUser = async () => {
        const userObject = {};
        const fullName = await askQuestion('Enter client full name: ', stringChecker);
        const age = await askQuestion('Enter client age: ', ageChecker);
        const budget = await askQuestion('Enter client starting budget: ', priceChecker);
        const gender = await askQuestion('Enter client gender: ', genderChecker);

        userObject["id"] = generateID();
        userObject["fullName"] = fullName;
        userObject["age"] = +age;
        userObject["budget"] = +budget;
        userObject["gender"] = gender;
        userObject["isVip"] = false;
        userObject["activeEvents"] = 0;

        dataCollection.users.push(userObject);
        writeData(dataCollection);
        console.log('Successfully created user!');
        rl.close();
        return;
    }

    const proceedIfUserDoesNotExits = (fullName) => {
        let isValidFullName = checkIfUserExists(fullName);

        if (isValidFullName) {

            console.log('There is no user with such full name');
            rl.close();
            return
        }

        return true
    }

    return {
        createUser,
        proceedIfUserDoesNotExits
    }
}

module.exports = userService