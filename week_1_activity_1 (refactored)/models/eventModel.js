const { generateID } = require("../utils/utils");

class Event {
    constructor(title, isOnlyForAdults = false, price = 0, visitors = []) {
        this.title = title;
        this.isOnlyForAdults = isOnlyForAdults;
        this.price = price;
        this.id = generateID();
        this.visitors = visitors;
    }
}

module.exports = { Event }