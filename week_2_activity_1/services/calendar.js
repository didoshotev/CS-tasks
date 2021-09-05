import { data, months } from "../data/data.js";
import draw from "../dom/draw.js";
import GlobalReference from "../global.js";

const CalendarService = { }

const viewObject = { year: '2016', month: 'March', monthOrder: 3, viewType: 'month'};

CalendarService.readDataInit = () => {
    const currentYear = data[viewObject.year];
    draw.body(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.readData = () => {
    const currentYear = data[viewObject.year];
    draw.changeText(viewObject.year, viewObject.month, currentYear[viewObject.month]);
}

CalendarService.changeData = (type) => {
    if(type === GlobalReference.NEXT_TEXT) {
        viewObject.month = months[viewObject.monthOrder += 1];
        CalendarService.readData();
    }
}

export default CalendarService;