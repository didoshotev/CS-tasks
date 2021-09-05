import { data, months } from "../data/data.js";
import draw from "../dom/draw.js";
import GlobalReference from "../global.js";

const LAST_MONTH_NUMBER = 12;
const FIRST_MONTH_NUMBER = 1;

const CalendarService = { }

const viewObject = { year: '2016', month: 'March', monthOrder: 3, viewType: 'month'};

CalendarService.changeYear = (type) => {

    if(type === GlobalReference.NEXT_TEXT) {
        
        viewObject.year       = (+viewObject.year + 1).toString();
        viewObject.month      = months[FIRST_MONTH_NUMBER];
        viewObject.monthOrder = FIRST_MONTH_NUMBER;

    } else if (type === GlobalReference.PREV_TEXT) {

        viewObject.year       = (+viewObject.year - 1).toString();
        viewObject.month      = months[LAST_MONTH_NUMBER];
        viewObject.monthOrder = LAST_MONTH_NUMBER;
    }
}

CalendarService.processDataInit = () => {
    const currentYear = data[viewObject.year];
    draw.body(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.processData = () => {
    const currentYear = data[viewObject.year];
    draw.changeHeadText(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.nextOrPrevMonth = (type) => {

    if(type === GlobalReference.NEXT_TEXT) {

        if(viewObject.monthOrder === LAST_MONTH_NUMBER) {
            CalendarService.changeYear(GlobalReference.NEXT_TEXT);
            CalendarService.processData();
            return;
        }

        viewObject.monthOrder = viewObject.monthOrder + 1;
        viewObject.month = months[viewObject.monthOrder];
        CalendarService.processData();

    } else if(type === GlobalReference.PREV_TEXT) {
       
        if(viewObject.monthOrder === FIRST_MONTH_NUMBER) {
            CalendarService.changeYear(GlobalReference.PREV_TEXT);
            CalendarService.processData();
            return;
        }

        viewObject.monthOrder = viewObject.monthOrder - 1;
        viewObject.month = months[viewObject.monthOrder];
        CalendarService.processData();
    }
}

CalendarService.readViewObject = () => {
    return viewObject;
}

CalendarService.addEvent = (day, { title, description }) => {
    
    const selectedDay =  data[viewObject.year][viewObject.month][day];
    selectedDay.event = { title, description };
    
    data[viewObject.year][viewObject.month][day] = selectedDay;
}

CalendarService.getEvent = (day) => {
    
    const selectedDay    =  data[viewObject.year][viewObject.month][day];
    const checkForEvents = (Object.keys(selectedDay.event)).length <= 0; 

    if(checkForEvents) {
        return { hasEvents: false, message: 'There are no added events yet'}
    }
    
    return { hasEvents: true, ...selectedDay }
}

export default CalendarService;