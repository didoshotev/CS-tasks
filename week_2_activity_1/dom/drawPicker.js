import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";

const drawPicker = { };

let isPickerOpened = false;
const viewObject = CalendarService.getViewObject();

drawPicker.init = () => { 

    $('.datepicker-container').appendNodeWithClass('button', 'button-datepicker');
    const buttonPicker = $('.button-datepicker')
    .css({ marginLeft: '20px', fontSize: '20px', border: '2px solid #EF6E67', position: 'relative'}).text('Datepicker')
    
    buttonPicker.addEventListener('click', setIsPickerOpened);
}

drawPicker.show = () => { 
    
    $('.datepicker-container').appendNodeWithClass('div', 'datepicker-body');
    const datePickerBodyEl = $('.datepicker-body');
    datePickerBodyEl.appendNodeWithClass('div', 'datepicker-content');
    
    const datepickerContentEl = $('.datepicker-content').appendHtml(`
    <div>${viewObject.date.toDateString()}</div>`);

    datePickerBodyEl.appendNodeWithClass('div', 'datepicker-content-grid');
    const datepickerContentGrid = $('.datepicker-content-grid');

    for (let i = 0; i < viewObject.daysInMonthCount; i++) {
        datepickerContentGrid.appendNodeWithClass('div', 'datepicker-grid-item');
    }
    drawPicker.changeCellsText();
    // drawPicker.body();
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

function cellClickHandler(e) { 
    const clickedDate = e.target.textContent;
    
}

drawPicker.hide = () => { 
    $('.datepicker-body').deleteNode();
}

const setIsPickerOpened = () => {
    isPickerOpened = !isPickerOpened;

    isPickerOpened ? drawPicker.show() : drawPicker.hide(); 
}

export default drawPicker;