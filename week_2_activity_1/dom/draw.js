import $ from "../lib/library.js";

const draw = {}

draw.start = () => {
    
    draw.init();

};

draw.init = () => {

    const container = $('.container');
    container.appendHtml(`
    <div class="cal-head">
        <div class="head-content">
            <div>February</div>
            <div class="secondary-text">2015</div>
        </div>
        <div class="head-content head-content--view">
            <div class="border">week view</div>
            <div class="secondary-text">month view</div>
        </div>
    </div>
    `);

    container.appendNodeWithClass('div', 'cal-body');
    let newEl = $('.cal-body');
};

// year, month, days
draw.drawBody = (data) => {
    console.log(data);
};

export default draw;