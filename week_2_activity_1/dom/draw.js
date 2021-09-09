import { monthNames } from "../data/data.js";
import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";
import { getDaysInMonth } from "../utils/utils.js";
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

draw.body = (daysInMonthCount) => {

    const container = $('.container');
    const nodes     = container.childNodes();

    const isBodyAlreadyDrawn = nodes.length > GlobalReference.MAXIMUM_BODY_NODES;
    if (isBodyAlreadyDrawn) { return; }

    const bodyEl = container.appendAndGetNode('div', 'cal-body')

    for (let i = 0; i < daysInMonthCount; i++) {
        bodyEl.appendNodeWithClass('div', 'cal-body-item');
    }
    draw.attachEvents();
    draw.changeHeadText(daysInMonthCount);
}

draw.deleteBody = () => {
    $('.btn-group-second').removeEventListener('click', handlePrevOrNextClickBtn);
    $('.btn-group-first').removeEventListener('click', handlePrevOrNextClickBtn);

    $('.cal-body').deleteNode();
}

draw.changeHeadText = (daysInMonthCount) => {
    const viewObject = CalendarService.getViewObject();
    $('.head-content-month').text(monthNames[viewObject.date.getMonth()]);
    $('.head-content-year').text(viewObject.date.getFullYear());
    // $('.head-content-month').text(month);
    // $('.head-content-year').text(year);
    draw.changeCellsText(daysInMonthCount);
    draw.addOrRemoveCells(daysInMonthCount);
}

draw.changeCellsText = (days) => {

    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    for (let i = 0; i < elementCollection.length; i++) {

        const el = $(`.cal-body-item:nth-child(${i + 1})`);
        el.text(`${i + 1}`);
        el.addEventListener('click', (e) => draw.cellClickHandler(i + 1))
    }
}

draw.addOrRemoveCells = (daysInMonthCount) => {

    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    if (daysInMonthCount < elementCollection.length) {
        for (let i = elementCollection.length; i > daysInMonthCount; i--) {

            const cell = $(`.cal-body-item:nth-child(${i})`);
            cell.removeEventListener('click', draw.cellClickHandler);
            cell.deleteNode();
        }
    } else if (daysInMonthCount > elementCollection.length) {

        for (let i = daysInMonthCount; i > elementCollection.length; i--) {
            bodyEl.appendNodeWithClass('div', 'cal-body-item');
        }
        draw.changeCellsText(daysInMonthCount);
    }
}

draw.attachEvents = () => {

    $('.btn-group-second').addEventListener('click', handlePrevOrNextClickBtn)
    $('.btn-group-first').addEventListener('click', handlePrevOrNextClickBtn)

    $('.week-view').addEventListener('click', () => {
        const viewObject = CalendarService.getViewObject();

        draw.deleteBody();
        drawWeekly.body(viewObject);
    })

    $('.month-view').addEventListener('click', () => {
        const viewObject = CalendarService.getViewObject();

        drawWeekly.deleteBody();
        draw.body(getDaysInMonth(viewObject.date.getMonth() + 1, viewObject.date.getFullYear()));
    })
}

draw.selectCell = (day) => {

    let currentEl = $(`.cal-body-item:nth-child(${day})`);

    if (!currentEl.element) {
        currentEl = $(`.cal-week-body-item:nth-child(${day})`);
    }

    selectedCells.push(currentEl);
    currentEl.css({
        backgroundColor: '#DDDDDD'
    });
};

draw.eventPopup = (event) => {

    const shouldDrawForm = !event.hasEvents && !isPopupDrawn;

    if (shouldDrawForm) {

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

    const formPopupContentEl = $('.events-popup').appendAndGetNode('div', 'events-popup-form-content');

    (formPopupContentEl.appendAndGetNode('p', 'event-heading')).text('No added events yet. Enter title and description for a new one!').css({ fontSize: '19px' });

    (formPopupContentEl.appendAndGetNode('label', 'title-label')).text('Title').css({ marginRight: '10px' });

    formPopupContentEl.appendNodeWithClass('input', 'title-input');

    (formPopupContentEl.appendAndGetNode('label', 'description-label')).text('Description').css({ margin: '0 10px' });

    formPopupContentEl.appendNodeWithClass('input', 'description-input');

    (formPopupContentEl.appendAndGetNode('button', 'event-btn'))
        .text('Submit').css({ marginLeft: '10px' }).addEventListener('click', handleSubmitEvent);

    isPopupDrawn = true;
}

draw.eventPopupContent = ({ title, description }) => {
    
    const eventPopupEl   = $('.events-popup');
    const eventPopupInfo = eventPopupEl.appendAndGetNode('div', 'event-popup-info');

    (eventPopupInfo.appendAndGetNode('p', 'event-title')).text(`Title: ${title}`);
    (eventPopupInfo.appendAndGetNode('p', 'event-description')).text(`Description: ${description}`);

    isInfoDrawn = true;
}

draw.cellClickHandler = (day) => {
    
    const event = CalendarService.getEvent(day);
    draw.removeFocusedCell();

    draw.selectCell(day);
    selectedDay = day;
    draw.eventPopup(event);
};

draw.removeFocusedCell = function () {

    if (selectedCells.length === 0) { return; }

    selectedCells[0].css({
        backgroundColor: 'white'
    })
    selectedCells.shift();
}


function handleSubmitEvent() {

    // should check input
    const title = $('.title-input').html();
    const description = $('.description-input').html();

    CalendarService.addEvent({ title: title.value, description: description.value });
    title.value = '';
    description.value = '';
}

function handlePrevOrNextClickBtn(e) {
    const nextOrPrevBtnClicked = e.target.textContent.toLowerCase() === GlobalReference.NEXT_TEXT;

    draw.removeFocusedCell();

    nextOrPrevBtnClicked ? CalendarService.nextOrPrevMonth(GlobalReference.NEXT_TEXT) :
        CalendarService.nextOrPrevMonth(GlobalReference.PREV_TEXT)
}

export default draw;