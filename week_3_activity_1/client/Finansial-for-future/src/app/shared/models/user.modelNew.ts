import { ILoan, IUser, IUserNew } from "../interfaces";

export class UserNew {
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public streetAddress: string;
    public moneyBalance: number;
    public creditCards: [];
    public _id: string;
    public __v: string;
    public type: string;
    public loansCollection?: ILoan[];

    constructor(firstName: string, middleName: string, lastName: string,
        streetAddress: string, moneyBalance: number,
        creditCards: [], id: string, type: string, loansCollection?: ILoan[]) {

        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.moneyBalance = moneyBalance;
        this.creditCards = creditCards;
        this._id = id;
        this.type = type;
        this.loansCollection = loansCollection;
    }

    processAndReturnUser(unProcessedUserObject: any): IUserNew {
        const { firstName, middleName, lastName, loan, moneyBalance, creditCards, streetAddress, type, _id } = unProcessedUserObject;

        return {
            firstName,
            middleName,
            lastName,
            loansCollection: loan,
            moneyBalance,
            creditCards,
            streetAddress,
            type,
            id: _id
        }
    }

    get currentUser():IUserNew {
        return { 
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            loansCollection: this.loansCollection,
            moneyBalance: this.moneyBalance,
            creditCards: this.creditCards,
            streetAddress: this.streetAddress,
            type: this.type,
            id: this._id
        }
    }
}

