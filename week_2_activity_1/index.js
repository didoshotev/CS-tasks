import draw from "./dom/draw.js";
import CalendarService from "./services/calendar.js";

draw.start();

const format = "406771200000";

// const date = new Date("2016-12-29");
const date = new Date("05/12/2015");

// console.log(date.toDateString());

// console.log(Date());

CalendarService.readDataInit();
