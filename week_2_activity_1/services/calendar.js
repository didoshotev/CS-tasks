import { monthNames } from "../data/data.js";
import events from "../data/events.js";
import draw from "../dom/draw.js";
import GlobalReference from "../global.js";
import { getDaysInMonth } from "../utils/utils.js";

const LAST_MONTH_NUMBER = 12;
const FIRST_MONTH_NUMBER = 1;

const CalendarService = {}

const startDate = new Date(Date.now());

const viewObject2 = {};

CalendarService.processDataInit = () => {

    viewObject2.date = startDate;
    draw.body(getDaysInMonth(startDate.getMonth() + 1, viewObject2.date.getFullYear()));
}

CalendarService.processData = () => {
    draw.changeHeadText(getDaysInMonth(startDate.getMonth() + 1, viewObject2.date.getFullYear()));
}

CalendarService.addEvent = ({ title, description }) => {
    
    const dateObject = Object.assign({}, viewObject2); 
    const dateString = `${dateObject.date.getMonth() + 1}/${dateObject.date.getDate()}/${dateObject.date.getFullYear()}`;
    const eventDate  = new Date(dateString);
    
    events.push({date: eventDate ,title, description});
}

CalendarService.getViewObject = () => {
    return viewObject2;
}

CalendarService.getEvent = (day) => {

    const currentDate = viewObject2.date;
    currentDate.setDate(day);

    const currentEvent = events.find(event =>{ 
        return event.date.getDay() === currentDate.getDay() &&
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear();
    })

    const result = currentEvent ? { hasEvents: true, currentEvent } : { hasEvents: false, message: 'There are no added events yet' };
    return result;
}


CalendarService.nextOrPrevMonth = (type) => {
    const isYearChanged = CalendarService.checkForYearChange(type);

    if(!isYearChanged){
        CalendarService.changeOnlyMonth(type);
    }
    CalendarService.processData();
}

CalendarService.checkForYearChange = (type) => {

    const shouldIncrementYear = type === GlobalReference.NEXT_TEXT && viewObject2.date.getMonth() + 1 === LAST_MONTH_NUMBER;
    const shouldDecrementYear = type === GlobalReference.PREV_TEXT && viewObject2.date.getMonth() + 1 === FIRST_MONTH_NUMBER;

    shouldIncrementYear ? CalendarService.changeYear(GlobalReference.NEXT_TEXT) : shouldDecrementYear && CalendarService.changeYear(GlobalReference.PREV_TEXT);

    return shouldDecrementYear || shouldIncrementYear;
}

CalendarService.changeYear = (type) => {

    const newYear = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;
    
    viewObject2.date.setFullYear(viewObject2.date.getFullYear() + newYear);
    viewObject2.date.setMonth(newYear === 1 ? 0 : 11);
}

CalendarService.nextOrPrevWeek = (type) => { 
    
    const newDate = (type === GlobalReference.NEXT_TEXT ) ? GlobalReference.WEEK_DAYS : -GlobalReference.WEEK_DAYS;

    viewObject2.date.setDate(viewObject2.date.getDate() + newDate);
}

CalendarService.changeOnlyMonth = (type) => {
    const newMonth = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;
    
    viewObject2.date.setMonth(viewObject2.date.getMonth() + newMonth);
}


CalendarService.selectDate = (date) => { 
    viewObject2.date = date;
    CalendarService.processData();
    draw.cellClickHandler(viewObject2.date.getDate());
}


export default CalendarService;