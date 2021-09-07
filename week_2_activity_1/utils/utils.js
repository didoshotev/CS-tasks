// 1, 2021
const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}
export { getDaysInMonth }