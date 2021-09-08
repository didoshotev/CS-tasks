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

    viewObject2.year = startDate.getFullYear();
    viewObject2.month = monthNames[startDate.getMonth()];
    viewObject2.monthOrder = startDate.getMonth() + 1;
    viewObject2.daysInMonthCount = getDaysInMonth(viewObject2.monthOrder, viewObject2.year);
    viewObject2.date = startDate;

    draw.body(viewObject2.year, viewObject2.month, viewObject2.daysInMonthCount);
}

CalendarService.processData = () => {
    draw.changeHeadText(viewObject2.year, viewObject2.month, viewObject2.daysInMonthCount);
}

CalendarService.addEvent = (day, { title, description }) => {
    events.push({ day: day, month: viewObject2.month, year: viewObject2.year, title, description });
}

CalendarService.getViewObject = () => {
    return viewObject2;
}

CalendarService.getEvent = (day) => {

    const currentEvent = events.find(event => {
        return event.day === day && event.month === viewObject2.month && event.year === viewObject2.year;
    })

    const result = currentEvent ? { hasEvents: true, currentEvent } : { hasEvents: false, message: 'There are no added events yet' };
    return result;
}

CalendarService.changeOnlyMonth = (type) => {
    const newMonth = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;
    viewObject2.monthOrder = viewObject2.monthOrder + newMonth;
    viewObject2.month = monthNames[viewObject2.monthOrder - 1];
    viewObject2.daysInMonthCount = getDaysInMonth(viewObject2.monthOrder, viewObject2.year);
    viewObject2.date.setMonth(viewObject2.monthOrder);
    CalendarService.processData();
}

CalendarService.nextOrPrevMonth = (type) => {

    const isYearChanged = checkForYearChange(type);

    if(isYearChanged){ return }

    CalendarService.changeOnlyMonth(type);
}

CalendarService.nextOrPrevWeek = (type) => { 
    
    const newDate = (type === GlobalReference.NEXT_TEXT ) ? GlobalReference.WEEK_DAYS : -GlobalReference.WEEK_DAYS;

    viewObject2.date.setDate(viewObject2.date.getDate() + newDate);
}

CalendarService.changeYear = (type) => {

    const newYear = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;
    viewObject2.year = (+viewObject2.year + newYear);
    viewObject2.date.setYear(viewObject2.date.getFullYear() + 1);

    type === GlobalReference.NEXT_TEXT ? processChangeYear(FIRST_MONTH_NUMBER) : processChangeYear(LAST_MONTH_NUMBER);
}

CalendarService.selectDate = (date) => { 
    viewObject2.date = date;
    viewObject2.month = monthNames[viewObject2.date.getMonth()];
    viewObject2.monthOrder = viewObject2.date.getMonth() + 1;
    viewObject2.daysInMonthCount = getDaysInMonth(viewObject2.date.getMonth(), viewObject2.year);
    CalendarService.processData();
    draw.cellClickHandler(viewObject2.date.getDate());
}

const checkForYearChange = (type) => {

    const shouldIncrementYear = type === GlobalReference.NEXT_TEXT && viewObject2.monthOrder === LAST_MONTH_NUMBER;
    const shouldDecrementYear = type === GlobalReference.PREV_TEXT && viewObject2.monthOrder === FIRST_MONTH_NUMBER;

    shouldIncrementYear ? checkYearText(GlobalReference.NEXT_TEXT) : shouldDecrementYear && checkYearText(GlobalReference.PREV_TEXT);
    CalendarService.processData();

    return shouldDecrementYear || shouldIncrementYear;
}

const checkYearText = (textType) => {
    CalendarService.changeYear(textType); 
}

const processChangeYear = (monthOrder) => {
    viewObject2.month = monthNames[monthOrder - 1];
    viewObject2.monthOrder = monthOrder;
}

export default CalendarService;