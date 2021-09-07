import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";
import drawPicker from "./drawPicker.js";
import drawWeekly from "./drawWeekly.js";

const selectedCells = [];

let isPopupDrawn = false;
let isInfoDrawn = false;
let selectedDay;

// how to return the newly create element
// pass param to non anonymous function in event listener

const draw = {}

draw.start = () => {
    draw.init();
    drawPicker.init();    
};

draw.init = () => {

    const container = $('.container');
    container.appendHtml(`
    <div class="cal-head">
        <div class="head-content">
            <div class="head-content-month"></div>
            <div class="secondary-text head-content-year"></div>
        </div>
        <div class="head-content head-content--view">
            <div class="border week-view">week view</div>
            <div class="secondary-text month-view">month view</div>
        </div>
    </div>
    `);
};

draw.body = (year, month, daysInMonthCount) => {

    const container = $('.container');
    
    const nodes = container.childNodes();

    if(nodes.length >= 4) { return; }

    container.appendNodeWithClass('div', 'cal-body');
    const bodyEl = $('.cal-body');

    for (let i = 0; i < daysInMonthCount; i++) {
        bodyEl.appendNodeWithClass('div', 'cal-body-item');
    }
    draw.attachEvents();
    draw.changeHeadText(year, month, daysInMonthCount);
}

draw.deleteBody = () => {
    $('.btn-group-second').removeEventListener('click', handleNextClickBtn);
    $('.btn-group-first').removeEventListener('click', handlePrevClickBtn);

    $('.cal-body').deleteNode();
}

draw.changeHeadText = (year, month, daysInMonthCount) => {

    $('.head-content-month').text(month);
    $('.head-content-year').text(year);

    draw.changeCellsText(daysInMonthCount);
    draw.addOrRemoveCells(daysInMonthCount);
}

draw.changeCellsText = (days) => {

    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    for (let i = 0; i < elementCollection.length; i++) {

        const el = $(`.cal-body-item:nth-child(${i + 1})`);
        el.text(`${i + 1}`);
        el.addEventListener('click', (e) => draw.cellClickHandler(e, i + 1))
    }
}

draw.addOrRemoveCells = (daysInMonthCount) => {

    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    const cellsViewNeedChange = daysInMonthCount === elementCollection.length;

    if (!cellsViewNeedChange) { return; }

    if (daysInMonthCount < elementCollection.length) {

        for (let i = elementCollection.length; i > daysInMonthCount; i--) {

            const cell = $(`.cal-body-item:nth-child(${i})`);
            cell.removeEventListener('click', draw.cellClickHandler);
            cell.deleteNode();
        }
        return;
    }

    for (let i = daysInMonthCount; i > elementCollection.length; i--) {
        bodyEl.appendNodeWithClass('div', 'cal-body-item');
    }
    draw.changeCellsText(daysInMonthCount);
}

draw.attachEvents = () => {

    $('.btn-group-second').addEventListener('click', handleNextClickBtn)
    $('.btn-group-first').addEventListener('click', handlePrevClickBtn)

    $('.week-view').addEventListener('click', () => { 
        const viewObject = CalendarService.getViewObject();

        draw.deleteBody();
        drawWeekly.body(viewObject);
    })

    $('.month-view').addEventListener('click', () => {
        const viewObject = CalendarService.getViewObject();

        drawWeekly.deleteBody();
        draw.body(viewObject.year, viewObject.month, viewObject.daysInMonthCount);
    })
}

draw.selectCell = (day) => {

    let currentEl = $(`.cal-body-item:nth-child(${day})`);
    
    if(!currentEl.element) { 
        currentEl = $(`.cal-week-body-item:nth-child(${day})`);
    }

    selectedCells.push(currentEl);
    currentEl.css({
        backgroundColor: '#DDDDDD'
    });
};

draw.eventPopup = (event) => {

    if (!event.hasEvents && !isPopupDrawn) {

        draw.formPopupContent();
        isInfoDrawn && ($('.event-popup-info').deleteNode(), isInfoDrawn = false)

        return

    } else if (event.hasEvents) {

        const formEl = $('.events-popup-form-content');
        formEl.element && formEl.deleteNode();
        isPopupDrawn = false;

        draw.eventPopupContent(event.currentEvent);
        return;
    }
}

draw.formPopupContent = () => {

    const eventPopupEl = $('.events-popup');

    eventPopupEl.appendNodeWithClass('div', 'events-popup-form-content');
    const formPopupContentEl = $('.events-popup-form-content');

    formPopupContentEl.appendNodeWithClass('p', 'event-heading');
    $('.event-heading').text('No added events yet. Enter title and description for a new one!').css({ fontSize: '19px' });

    formPopupContentEl.appendNodeWithClass('label', 'title-label');
    $('.title-label').text('Title').css({ marginRight: '10px' });
    formPopupContentEl.appendNodeWithClass('input', 'title-input');

    formPopupContentEl.appendNodeWithClass('label', 'description-label');
    $('.description-label').text('Description').css({ margin: '0 10px' });
    formPopupContentEl.appendNodeWithClass('input', 'description-input');

    formPopupContentEl.appendNodeWithClass('button', 'event-btn');
    $('.event-btn').text('Submit').css({ marginLeft: '10px' }).addEventListener('click', handleSubmitEvent);

    isPopupDrawn = true;
}

draw.eventPopupContent = ({ title, description }) => {
    const eventPopupEl = $('.events-popup');

    eventPopupEl.appendNodeWithClass('div', 'event-popup-info');
    const eventPopupInfo = $('.event-popup-info');

    eventPopupInfo.appendNodeWithClass('p', 'event-title')
    $('.event-title').text(`Title: ${title}`);

    eventPopupInfo.appendNodeWithClass('p', 'event-description')
    $('.event-description').text(`Description: ${description}`);

    isInfoDrawn = true;
}

function handleSubmitEvent() {

    // should check input
    const title = $('.title-input').html();
    const description = $('.description-input').html();

    CalendarService.addEvent(selectedDay, { title: title.value, description: description.value });
    title.value = '';
    description.value = '';
}

draw.cellClickHandler = (e, day) => {
    const event = CalendarService.getEvent(day);
    draw.removeFocusedCell();

    draw.selectCell(day);
    selectedDay = day;
    draw.eventPopup(event);
};

draw.removeFocusedCell = function() {

    if (selectedCells.length > 0) {

        selectedCells[0].css({
            backgroundColor: 'white'
        })
        selectedCells.shift();
    }
}

function handlePrevClickBtn() { 
    draw.removeFocusedCell();
    CalendarService.nextOrPrevMonth(GlobalReference.PREV_TEXT);
}

function handleNextClickBtn() { 
    draw.removeFocusedCell();
    CalendarService.nextOrPrevMonth(GlobalReference.NEXT_TEXT);
}



export default draw;