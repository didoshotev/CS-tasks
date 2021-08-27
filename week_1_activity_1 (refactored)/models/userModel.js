const { generateID } = require("../utils/utils");


class User {
    constructor(fullName, age, budget = 0, gender, activeEvents = 0) {
        this.fullName = fullName;
        this.age = age;
        this.budget = budget;
        this.gender = gender;
        this.id = generateID();
        this.activeEvents = activeEvents;
        this.isVip = false;
    }

    get isUserVip() {
        return this.activeEvents === 5 ? true : false;
    }

    set incrementActiveEvents(value) {
        this.activeEvents += value;
    }
}

module.exports = { User }