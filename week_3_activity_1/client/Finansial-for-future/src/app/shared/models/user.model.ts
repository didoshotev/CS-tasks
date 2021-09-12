import { ILoan } from "../interfaces";

export class User {
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public streetAddress: string;
    public moneyBalance: number;
    public creditCards: [];
    public loan?: ILoan

    constructor(firstName: string, middleName: string, lastName: string,
        streetAddress: string, moneyBalance: number,
        creditCards: [], loan?: ILoan) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.moneyBalance = moneyBalance;
        this.creditCards = creditCards;
        this.loan = loan;
    }
}

