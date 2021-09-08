// 1, 2021
const getDaysInMonth = (month, year) => {
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
export { getDaysInMonth, getWeek }