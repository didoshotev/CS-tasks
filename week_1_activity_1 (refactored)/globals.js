const { readData, getSystem } = require("./services/fsService");

const dataCollection = readData();
const dataSystemCollection = getSystem();

const GlobalReference = { }

GlobalReference.System = {
    canAddEvents: dataSystemCollection.canAddEvents,
    canAddVisitors: dataSystemCollection.canAddVisitors,
    changeAddEventsStatus: () => {
        dataSystemCollection.canAddEvents = !dataSystemCollection.canAddEvents;
    },
    changeAddVisitorsStatus: () => {
        dataSystemCollection.canAddVisitors = !dataSystemCollection.canAddVisitors;
    },
}

GlobalReference.USER_MIN_ADULT_AGE = 18;
GlobalReference.USER_VIP_NUMBER = 5;


module.exports = GlobalReference;