const GlobalReference = require("../globals");

const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 13);
};

const invalidMessageGenerator = (field) => {
    return `Invalid ${field} format. Please try again!`;
}

const priceChecker = (input) => {

    input = parseFloat(input.trim())
    const invalidPriceFormat = Number.isNaN(input) || input < 0;

    return invalidPriceFormat ? { message: invalidMessageGenerator('price') } : input;
}

const stringChecker = (input) => {

    const isEmptyString = input.trim() === "";
    
    if(!isEmptyString) {
        return input
    } else {
        return {message: invalidMessageGenerator('text')}
    }

    // !isEmptyString ? input : {message: invalidMessageGenerator('text')}   not working ? 
}

const genderChecker = (input) => {
    input = input.trim().toLowerCase();

    const isValidGender = (Object.values(GlobalReference.genderEnum)).includes(input);
   
    return isValidGender ? input : { message: invalidMessageGenerator('gender')}
}

const ageChecker = (input) => {
    
    input = parseInt(input.trim());
    const isValidAge = input && input > 0 && input <= 120;
    
    return isValidAge ? input : { message: invalidMessageGenerator('age') } 
}

const filterChecker = (input) => {
    input = input.trim();
    if (input === 'title' || input === 'flag') {
        return input
    }
    return { message: invalidMessageGenerator('filter') }
}

const isOnlyForAdultsChecker = (input) => {
    return GlobalReference.isOnlyForAdultsEnum[input.trim()] ? true : false; 
}

module.exports = {
    generateID, priceChecker, stringChecker, genderChecker,
    ageChecker, filterChecker, isOnlyForAdultsChecker
}