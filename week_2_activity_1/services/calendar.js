import { data, monthNames, months } from "../data/data.js";
import events from "../data/events.js";
import draw from "../dom/draw.js";
import GlobalReference from "../global.js";

const LAST_MONTH_NUMBER = 12;
const FIRST_MONTH_NUMBER = 1;

const CalendarService = {}

const startDate = new Date(Date.now());

const viewObject = { year: '2016', month: 'March', monthOrder: 3, viewType: 'month' };
const viewObject2 = {};

CalendarService.changeYear = (type) => {

    const newYear = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;
    viewObject2.year = (+viewObject2.year + newYear).toString();

    type === GlobalReference.NEXT_TEXT ? processChangeYear(FIRST_MONTH_NUMBER) : processChangeYear(LAST_MONTH_NUMBER);
}

CalendarService.processDataInit = () => {

    viewObject2.year = startDate.getFullYear();
    viewObject2.month = monthNames[startDate.getMonth()];
    viewObject2.monthOrder = startDate.getMonth() + 1;
    viewObject2.daysInMonthCount = daysInMonth(viewObject2.monthOrder, viewObject2.year);

    const currentYear = data[viewObject.year];
    draw.body2(viewObject2.year, viewObject2.month, viewObject2.daysInMonthCount);
}

CalendarService.processData = () => {
    draw.changeHeadText(viewObject2.year, viewObject2.month, viewObject2.daysInMonthCount);
}

CalendarService.nextOrPrevMonth2 = (type) => {

    const shouldIncrementYear = type === GlobalReference.NEXT_TEXT && viewObject2.monthOrder === LAST_MONTH_NUMBER; 
    const shouldDecrementYear = type === GlobalReference.PREV_TEXT && viewObject2.monthOrder === FIRST_MONTH_NUMBER;

    if (shouldIncrementYear) {

        viewObject2.monthOrder === LAST_MONTH_NUMBER
        CalendarService.changeYear(GlobalReference.NEXT_TEXT);
        CalendarService.processData();
        return;

    } else if (shouldDecrementYear) {

        viewObject2.monthOrder === FIRST_MONTH_NUMBER
        CalendarService.changeYear(GlobalReference.PREV_TEXT);
        CalendarService.processData();
        return;
    }

    changeOnlyMonth(type);
    CalendarService.processData();
}

const changeOnlyMonth = (type) => {
    const newMonth = (type === GlobalReference.NEXT_TEXT) ? 1 : -1;

    viewObject2.monthOrder = viewObject2.monthOrder + newMonth;
    viewObject2.month = monthNames[viewObject2.monthOrder - 1];
    viewObject2.daysInMonthCount = daysInMonth(viewObject2.monthOrder, viewObject2.year);
    CalendarService.processData();
}

CalendarService.nextOrPrevMonth = (type) => {

    if (type === GlobalReference.NEXT_TEXT) {

        if (viewObject.monthOrder === LAST_MONTH_NUMBER) {
            CalendarService.changeYear(GlobalReference.NEXT_TEXT);
            CalendarService.processData();
            return;
        }

        viewObject.monthOrder = viewObject.monthOrder + 1;
        viewObject.month = months[viewObject.monthOrder];
        CalendarService.processData();

    } else if (type === GlobalReference.PREV_TEXT) {

        if (viewObject.monthOrder === FIRST_MONTH_NUMBER) {
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

CalendarService.addEvent2 = (day, { title, description }) => {
    events.push({ day: day, month: viewObject2.month, year: viewObject2.year, title, description });
}

CalendarService.getEvent2 = (day) => {

    const currentEvent = events.find(event => {
        return event.day === day && event.month === viewObject2.month && event.year === viewObject2.year;
    })

    const result = currentEvent ? { hasEvents: true, currentEvent } : { hasEvents: false, message: 'There are no added events yet' };
    return result;
}

CalendarService.addEvent = (day, { title, description }) => {

    const selectedDay = data[viewObject.year][viewObject.month][day];
    selectedDay.event = { title, description };

    data[viewObject.year][viewObject.month][day] = selectedDay;
}

CalendarService.getEvent = (day) => {

    const selectedDay = data[viewObject.year][viewObject.month][day];
    const checkForEvents = (Object.keys(selectedDay.event)).length <= 0;

    if (checkForEvents) {
        return { hasEvents: false, message: 'There are no added events yet' }
    }

    return { hasEvents: true, ...selectedDay }
}

const daysInMonth = (month, year) => { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}

const processChangeYear = (monthOrder) => {
    viewObject2.month = monthNames[monthOrder - 1];
    viewObject2.monthOrder = monthOrder;
}

export default CalendarService;