import { ILoan } from "../interfaces";

export class UserNew {
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public streetAddress: string;
    public moneyBalance: number;
    public creditCards: [];
    public id: string;
    public loan?: ILoan

    constructor(firstName: string, middleName: string, lastName: string,
        streetAddress: string, moneyBalance: number,
        creditCards: [], id: string, loan?: ILoan) {

        this.firstName     = firstName;
        this.middleName    = middleName;
        this.lastName      = lastName;
        this.streetAddress = streetAddress;
        this.moneyBalance  = moneyBalance;
        this.creditCards   = creditCards;
        this.id            = id;
        this.loan          = loan;
    }
}

