import { monthNames } from "../data/data.js";
import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";
import { getDaysInMonth } from "../utils/utils.js";

const drawPicker = {};

let isPickerOpened = false;
const drawPickerViewObject = {}

drawPicker.init = () => {

    ($('.datepicker-container').appendAndGetNode('button', 'button-datepicker'))
        .css({ marginLeft: '20px', fontSize: '20px', border: '2px solid #EF6E67', position: 'relative' })
        .text('Datepicker')
        .addEventListener('click', setIsPickerOpened);
}

drawPicker.show = () => {
    Object.assign(drawPickerViewObject, CalendarService.getViewObject());

    const datePickerBodyEl = ($('.datepicker-container').appendAndGetNode('div', 'datepicker-body'))
        .appendNodeWithClass('div', 'datepicker-content');

    $('.datepicker-content').appendHtml(`
        ${monthNames[drawPickerViewObject.date.getMonth()]} ${drawPickerViewObject.date.getFullYear()}`);

    datePickerBodyEl.appendAndGetNode('button', 'datepicker-prev').attr('data-direction', 'previous')
        .text('<').addEventListener('click', prevOrNextArrowsHanlder);

    datePickerBodyEl.appendAndGetNode('button', 'datepicker-next').attr('data-direction', 'next')
        .text('>').css({ marginLeft: '70px' }).addEventListener('click', prevOrNextArrowsHanlder);

    const datepickerContentGrid = datePickerBodyEl.appendAndGetNode('div', 'datepicker-content-grid');

    for (let i = 0; i < getDaysInMonth(drawPickerViewObject.date.getMonth() + 1, drawPickerViewObject.date.getFullYear()); i++) {
        datepickerContentGrid.appendNodeWithClass('div', 'datepicker-grid-item');
    }
    drawPicker.changeCellsText();
}

drawPicker.changeCellsText = () => {
    const datepickerContentGrid = $('.datepicker-content-grid');

    const elementCollection = [...datepickerContentGrid.childNodes()];

    for (let i = 0; i < elementCollection.length; i++) {

        const el = $(`.datepicker-grid-item:nth-child(${i + 1})`);
        el.text(`${i + 1}`);
        el.addEventListener('click', cellClickHandler);
    }
}

drawPicker.changeContent = (daysInMonthCount) => {
    $('.datepicker-content').text(`${monthNames[drawPickerViewObject.date.getMonth()]} ${drawPickerViewObject.date.getFullYear()}`)

    const datepickerGridEl = $('.datepicker-content-grid');
    const elementCollection = [...datepickerGridEl.childNodes()];

    if (daysInMonthCount < elementCollection.length) {
        for (let i = elementCollection.length; i > daysInMonthCount; i--) {

            const cell = $(`.datepicker-grid-item:nth-child(${i})`);
            cell.removeEventListener('click', cellClickHandler);
            cell.deleteNode();
        }
    } else if (daysInMonthCount > elementCollection.length) {

        for (let i = daysInMonthCount; i > elementCollection.length; i--) {
            datepickerGridEl.appendNodeWithClass('div', 'datepicker-grid-item');
        }
        drawPicker.changeCellsText(daysInMonthCount);
    }
}

drawPicker.hide = () => {
    isPickerOpened = false;
    $('.datepicker-body').deleteNode();
}

const setIsPickerOpened = () => {
    isPickerOpened = !isPickerOpened;

    isPickerOpened ? drawPicker.show() : drawPicker.hide();
}

function prevOrNextArrowsHanlder(e) {

    const isNextClicked = e.target.dataset.direction === GlobalReference.NEXT_TEXT;
    const nextMonth     = isNextClicked ? +1 : -1;

    drawPickerViewObject.date.setMonth(drawPickerViewObject.date.getMonth() + nextMonth);

    drawPicker.changeContent(getDaysInMonth(drawPickerViewObject.date.getMonth() + 1, drawPickerViewObject.date.getFullYear()));
}

function cellClickHandler(e) {
    const clickedDate = e.target.textContent;

    drawPickerViewObject.date.setDate(clickedDate);
    CalendarService.selectDate(drawPickerViewObject.date);
    drawPicker.hide();
}

export default drawPicker;