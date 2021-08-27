const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 13);
};

const priceChecker = (input) => {

    input = parseFloat(input.trim())

    if (Number.isNaN(input) || input < 0) {
        return { message: `Invalid price format. Please try again!` };
    } else {
        return input;
    }
}

const stringChecker = (input) => {
    input = input.trim();
    if (input === "") {
        return { message: `Invalid text format. Please try again!` };
    } else {
        return input;

    }
}

const genderChecker = (input) => {
    input = input.trim().toLowerCase();
    if (input === 'male' || input === 'm') {
        return input;
    } else if (input === 'female' || input === 'f') {
        return input;
    } else {
        return { message: 'Invalid gender format' };
    }
}

const ageChecker = (input) => {
    input = parseInt(input.trim());
    if (input && input > 0 && input <= 120) {
        return input;
    } else {
        return { message: 'Invalid age format' };
    }
}

const filterChecker = (input) => {
    input = input.trim();
    if (input === 'title' || input === 'flag') {
        return input
    }
    return { message: 'Invalid filter values. Please try again!'}
}

const yesNoChecker = (input) => {
    return input.trim() === 'no' ? true : false;
}

module.exports = { generateID, priceChecker, stringChecker, genderChecker, ageChecker, filterChecker, yesNoChecker }