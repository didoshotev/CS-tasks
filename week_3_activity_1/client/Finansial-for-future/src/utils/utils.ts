// 1, 2021
// type monthNumberTypes = 1|2|3|4|5|6|7|8|9|10|11|12;

const getDaysInMonth = (month:number, year:number):number => {
    return new Date(year, month, 0).getDate();
}

const getWeek = (fromDate) => {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay())),
      result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday));
    }
    return result;
}

const getFirstDay = (date:Date) => (date.getFullYear(), date.getMonth(), 1); 


export { getDaysInMonth, getWeek, getFirstDay }