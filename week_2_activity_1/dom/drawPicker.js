import { monthNames } from "../data/data.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";
import { getDaysInMonth } from "../utils/utils.js";

const drawPicker = {};

let isPickerOpened = false;
// const viewObject = CalendarService.getViewObject();
const drawPickerViewObject = {}

drawPicker.init = () => {

    // Object.assign(drawPickerViewObject, CalendarService.getViewObject());

    ($('.datepicker-container').appendAndGetNode('button', 'button-datepicker'))
        .css({ marginLeft: '20px', fontSize: '20px', border: '2px solid #EF6E67', position: 'relative' })
        .text('Datepicker')
        .addEventListener('click', setIsPickerOpened);
}

drawPicker.show = () => {
    const viewObject = CalendarService.getViewObject();
    Object.assign(drawPickerViewObject, viewObject);

    const datePickerBodyEl = ($('.datepicker-container').appendAndGetNode('div', 'datepicker-body'))
        .appendNodeWithClass('div', 'datepicker-content');

    $('.datepicker-content').appendHtml(`
        ${monthNames[viewObject.date.getMonth()]} ${viewObject.year}`);

    datePickerBodyEl.appendAndGetNode('button', 'datepicker-prev')
        .text('<').addEventListener('click', prevOrNextArrowsHanlder);

    datePickerBodyEl.appendAndGetNode('button', 'datepicker-next')
        .text('>').css({ marginLeft: '70px' }).addEventListener('click', prevOrNextArrowsHanlder);

    const datepickerContentGrid = datePickerBodyEl.appendAndGetNode('div', 'datepicker-content-grid');

    for (let i = 0; i < viewObject.daysInMonthCount; i++) {
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

function cellClickHandler(e) {
    const clickedDate = e.target.textContent;

    drawPickerViewObject.date.setDate(clickedDate);
    CalendarService.selectDate(drawPickerViewObject.date);
    drawPicker.hide();
}

function prevOrNextArrowsHanlder(e) {

    const nextMonth = e.target === $('.datepicker-next').html() ? +1 : -1;

    drawPickerViewObject.monthOrder = drawPickerViewObject.monthOrder + nextMonth;
    drawPickerViewObject.month = monthNames[drawPickerViewObject.monthOrder - 1];
    drawPickerViewObject.daysInMonthCount = getDaysInMonth(drawPickerViewObject.monthOrder, drawPickerViewObject.year);

    drawPickerViewObject.date.setMonth(drawPickerViewObject.monthOrder - 1);
    // drawPicker.changeCellsText();
    drawPicker.changeContent(drawPickerViewObject.daysInMonthCount);
}

const setIsPickerOpened = () => {
    isPickerOpened = !isPickerOpened;

    isPickerOpened ? drawPicker.show() : drawPicker.hide();
}

export default drawPicker;