import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";

const selectedCells = [];

let isPopupDrawn = false;
let isInfoDrawn = false;
let selectedDay;

// how to return the newly create element

const draw = {}

draw.start = () => {

    draw.init();
    draw.attachEvents();
    // draw.eventPopup();
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
            <div class="border">week view</div>
            <div class="secondary-text">month view</div>
        </div>
    </div>
    `);

    container.appendNodeWithClass('div', 'cal-body');
};


draw.body = (year, month, days) => {

    const bodyEl = $('.cal-body');

    for (const key in days) {
        bodyEl.appendNodeWithClass('div', 'cal-body-item');
    }
    draw.changeHeadText(year, month, days);
};

draw.changeHeadText = (year, month, days) => {

    $('.head-content-month').text(month);
    $('.head-content-year').text(year);

    draw.changeCellsText(days);
    draw.addOrRemoveCells(days);
}

draw.changeCellsText = (days) => {

    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    for (let i = 0; i < elementCollection.length; i++) {

        const el = $(`.cal-body-item:nth-child(${i + 1})`);
        el.text(`${i + 1}`);
        el.addEventListener('click', (e) => clickHandler(e, i + 1))
    }
}

draw.addOrRemoveCells = (days) => {

    const daysCollection = Object.values(days);
    const bodyEl = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    if (daysCollection.length < elementCollection.length) {

        //              31                      31 > 28
        for (let i = elementCollection.length; i > daysCollection.length; i--) {

            const cell = $(`.cal-body-item:nth-child(${i})`);
            cell.deleteNode();
        }

    } else if (daysCollection.length > elementCollection.length) {

        for (let i = daysCollection.length; i > elementCollection.length; i--) {
            bodyEl.appendNodeWithClass('div', 'cal-body-item');
        }
        draw.changeCellsText(days);
    }

}

draw.attachEvents = () => {

    attachEvent(GlobalReference.NEXT_TEXT, $('.btn-group-second'));
    attachEvent(GlobalReference.PREV_TEXT, $('.btn-group-first'));
}

draw.selectCell = (day) => {

    const currentEl = $(`.cal-body-item:nth-child(${day})`);
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

        $('.events-popup-form-content').deleteNode();
        isPopupDrawn = false;

        draw.eventPopupContent(event.event);
        return;
    }

    // eventPopupEl.styleDisplay();
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

function attachEvent(textType, buttonReference){

    buttonReference.addEventListener('click', () => {
        removeFocusedCell();
        CalendarService.nextOrPrevMonth(textType);
    });
}

function handleSubmitEvent() {

    // should check input
    const title = $('.title-input').html();
    const description = $('.description-input').html();

    CalendarService.addEvent(selectedDay, { title: title.value, description: description.value });
    title.value = '';
    description.value = '';
}

function clickHandler(e, day) {
    const event = CalendarService.getEvent(day);

    removeFocusedCell();

    draw.selectCell(day);
    selectedDay = day;
    draw.eventPopup(event);
};

function removeFocusedCell() {

    if (selectedCells.length > 0) {

        selectedCells[0].css({
            backgroundColor: 'white'
        })
        selectedCells.shift();
    }
}


export default draw;