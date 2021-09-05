import GlobalReference from "../global.js";
import $ from "../lib/library.js";
import CalendarService from "../services/calendar.js";

const draw = {}

draw.start = () => {
    
    draw.init();
    draw.attachEvents();
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
    // let newEl = $('.cal-body');
};

// year, month, days
draw.body = (year, month, days) => {

    const bodyEl = $('.cal-body');

    for (const key in days) {
        bodyEl.appendNodeWithClass('div', 'cal-body-item');
    }
    draw.changeText(year, month, days);
};

draw.changeText = (year, month, days) => {

    $('.head-content-month').text(month);
    $('.head-content-year').text(year);
    draw.changeCellsText(days);

    draw.addRemoveCells(days);
   

}

draw.changeCellsText = (days) => {

    const bodyEl            = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];
    
    for (let i = 0; i < elementCollection.length; i++) {

        const el = $(`.cal-body-item:nth-child(${i+1})`);
        el.text(`${i+1}`);
        el.addEventListener('click', (e) => clickHandler(e, i+1))
    }
}

draw.addRemoveCells = (days) => {

    const daysCollection    = Object.values(days);
    const bodyEl            = $('.cal-body');
    const elementCollection = [...bodyEl.childNodes()];

    if(daysCollection.length < elementCollection.length) {

        //              31                      31 > 28
        for (let i = elementCollection.length; i > daysCollection.length; i--) {

            const cell = $(`.cal-body-item:nth-child(${i})`);
            cell.deleteNode();
        }
    } else if(daysCollection.length > elementCollection.length) {

        for (let i = daysCollection.length; i > elementCollection.length; i--) {
            bodyEl.appendNodeWithClass('div', 'cal-body-item');
        }
        draw.changeCellsText(days);
    }

}

draw.attachEvents = () => {
    
    const nextBtn = $('.btn-group-second');
    nextBtn.addEventListener('click', () => {
        CalendarService.changeData(GlobalReference.NEXT_TEXT);
    });

    const prevBtn = $('.btn-group-first');
    prevBtn.addEventListener('click', () => {
        CalendarService.changeData(GlobalReference.PREV_TEXT);
    });
}

function clickHandler(e, day) {
    console.log(day);
};

export default draw;