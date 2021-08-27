const { getSystem } = require("./services/fsService");

const dataSystemCollection = getSystem();

const GlobalReference = { }


GlobalReference.USER_MIN_ADULT_AGE = 18;
GlobalReference.USER_VIP_NUMBER = 5;

GlobalReference.DB_EVENTS_COLL_NAME = 'events';
GlobalReference.DB_VISITORS_COLL_NAME = 'visitors';

GlobalReference.isOnlyForAdultsEnum = {
    'yes': true,
    'no': false
}

GlobalReference.genderEnum = {
    'MALE': 'm',
    'FEMALE': 'f'
} 


GlobalReference.System = {
    canAddEvents: dataSystemCollection.canAddEvents,
    canAddVisitors: dataSystemCollection.canAddVisitors,
    
    changeAddEventsStatus: () => {
        console.log(systemChangeMessage(GlobalReference.DB_EVENTS_COLL_NAME));
        dataSystemCollection.canAddEvents = !dataSystemCollection.canAddEvents;
    },
    
    changeAddVisitorsStatus: () => {
        console.log(systemChangeMessage(GlobalReference.DB_VISITORS_COLL_NAME));
        dataSystemCollection.canAddVisitors = !dataSystemCollection.canAddVisitors;
    },

    checkAddEventsStatus: () => {

        if(!dataSystemCollection.canAddEvents) {
            console.log(systemDisabledMessage(GlobalReference.DB_EVENTS_COLL_NAME, 'disabled'));
            return false
        }
        return true
    },
    
    checkAddVisitorsStatus: () => {
        
        if(!dataSystemCollection.canAddVisitors) {
            console.log(systemDisabledMessage(GlobalReference.DB_VISITORS_COLL_NAME, 'disabled'));
            return false
        }
        return true;
    }
}




function systemDisabledMessage(type, status) {
    return `System add ${type} feature is currently ${status}`;
}

function systemChangeMessage(type) {
    return `System add ${type} status changed!`
}

Object.freeze(GlobalReference);

module.exports = GlobalReference;