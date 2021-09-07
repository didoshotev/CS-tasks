import draw from "./dom/draw.js";
import CalendarService from "./services/calendar.js";

draw.start();

const startDate = new Date(Date.now());
CalendarService.processDataInit(startDate);

// const date = new Date("2016-12-29");
// const date = new Date("9/07/2021");
// console.log(date.toDateString());

// console.log(date.getDate()); // return day
// console.log(date.getDay()); // return day of the week
// console.log(date.getFullYear()); // return the year
// console.log(date.getMonth() + 1); // return the month
// console.log(date.getUTCDate()); // return the year
// console.log(date.toJSON()); // return the year
