import { data, months } from "../data/data.js";
import draw from "../dom/draw.js";
import GlobalReference from "../global.js";

const LAST_MONTH_NUMBER = 12;
const FIRST_MONTH_NUMBER = 1;

const CalendarService = { }

const viewObject = { year: '2016', month: 'March', monthOrder: 3, viewType: 'month'};

CalendarService.changeYear = (type) => {

    if(type === GlobalReference.NEXT_TEXT) {
        
        viewObject.year = (+viewObject.year + 1).toString();
        viewObject.month = months[1];
        viewObject.monthOrder = 1;
    } else if (type === GlobalReference.PREV_TEXT) {

        viewObject.year = (+viewObject.year - 1).toString();
        viewObject.month = months[12];
        viewObject.monthOrder = 12;
        
    }
}

CalendarService.readDataInit = () => {
    const currentYear = data[viewObject.year];
    draw.body(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.readData = () => {
    const currentYear = data[viewObject.year];
    draw.changeHeadText(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.nextOrPrevMonth = (type) => {

    if(type === GlobalReference.NEXT_TEXT) {

        if(viewObject.monthOrder === LAST_MONTH_NUMBER) {
            CalendarService.changeYear(GlobalReference.NEXT_TEXT);
            CalendarService.readData();
            return;
        }

        viewObject.monthOrder = viewObject.monthOrder + 1;
        viewObject.month = months[viewObject.monthOrder];
        CalendarService.readData();

    } else if(type === GlobalReference.PREV_TEXT) {
       
        if(viewObject.monthOrder === FIRST_MONTH_NUMBER) {
            CalendarService.changeYear(GlobalReference.PREV_TEXT);
            CalendarService.readData();
            return;
        }

        viewObject.monthOrder = viewObject.monthOrder - 1;
        viewObject.month = months[viewObject.monthOrder];
        CalendarService.readData();
    }
}

export default CalendarService;