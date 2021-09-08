import { monthNames } from "../data/data.js";
import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";
import { getWeek } from "../utils/utils.js";
import draw from "./draw.js";

const drawWeekly = { };


drawWeekly.body = () => { 
    
    const container = $('.container');
    
    const nodes = container.childNodes();

    const isBodyAlreadyDrawn = nodes.length > GlobalReference.MAXIMUM_BODY_NODES;
    if(isBodyAlreadyDrawn) { return; }

    const bodyEl = container.appendAndGetNode('div', 'cal-week-body');

    for (let i = 0; i < GlobalReference.WEEK_DAYS; i++) {
        bodyEl.appendNodeWithClass('div', 'cal-week-body-item');
    }
    drawWeekly.changeCellsText();

    $('.btn-group-second').addEventListener('click', handleWeekButton);
    $('.btn-group-first').addEventListener('click', handleWeekButton);
}

drawWeekly.changeCellsText = () => {

    const viewObject = CalendarService.getViewObject();
    const week = getWeek(viewObject.date);
    
    const bodyEl = $('.cal-week-body');
    const elementCollection = [...bodyEl.childNodes()];

    for (let i = 0; i < elementCollection.length; i++) {

        const currentEl = $(`.cal-week-body-item:nth-child(${i + 1})`);
        currentEl.text(`${week[i].getDate()}`)

        currentEl.addEventListener('click', (e) => draw.cellClickHandler(i + 1));
    }
}

drawWeekly.deleteBody = () => { 

    $('.btn-group-second').removeEventListener('click', handleWeekButton);
    $('.btn-group-first').removeEventListener('click', handleWeekButton);

    $('.cal-week-body').deleteNode();
}

function handleWeekButton(e) {

    const isNextClicked = e.srcElement === $('.btn-group-second').html();
    
    isNextClicked ? CalendarService.nextOrPrevWeek(GlobalReference.NEXT_TEXT) : CalendarService.nextOrPrevWeek(GlobalReference.PREV_TEXT); 
    
    changeHead();

    draw.removeFocusedCell();
    drawWeekly.changeCellsText();
}

const changeHead = () => {
    const viewObject = CalendarService.getViewObject();
    
    $('.head-content-month').text(monthNames[viewObject.date.getMonth()]);
    $('.head-content-year').text(viewObject.date.getFullYear());
}

export default drawWeekly;