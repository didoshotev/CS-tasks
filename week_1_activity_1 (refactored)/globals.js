const { readData, getSystem } = require("./services/fsService");

const dataCollection = readData();
const dataSystemCollection = getSystem();

const GlobalReference = { }

GlobalReference.System = {
    canAddEvents: dataSystemCollection.canAddEvents,
    canAddVisitors: dataSystemCollection.canAddVisitors,
    changeAddEventsStatus: () => {
        console.log('System add event status changed!');
        dataSystemCollection.canAddEvents = !dataSystemCollection.canAddEvents;
    },
    changeAddVisitorsStatus: () => {
        console.log('System add visitor status changed!');
        dataSystemCollection.canAddVisitors = !dataSystemCollection.canAddVisitors;
    },

    checkAddEventsStatus: () => {
        if(!dataSystemCollection.canAddEvents) {
            console.log('System add events feature is currently disabled!');
            return false
        }
        return true
    },
    
    checkAddVisitorsStatus: () => {
        if(!dataSystemCollection.canAddVisitors) {
            console.log('System add visitor feature is currently disabled!');
            return false;
        }
        return true;
    }
}

GlobalReference.USER_MIN_ADULT_AGE = 18;
GlobalReference.USER_VIP_NUMBER = 5;


module.exports = GlobalReference;