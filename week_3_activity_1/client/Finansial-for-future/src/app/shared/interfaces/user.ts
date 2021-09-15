import { IBase } from "./base";
import { ILoan } from "./loan";

export interface IUser extends IBase {
    firstName: string;
    middleName: string;
    lastName: string;
    streetAddress: string;
    moneyBalance: number;
    creditCards: [];
    loan?: ILoan[]
}

export interface IUserNew {
    firstName: string;
    middleName: string;
    lastName: string;
    streetAddress: string;
    moneyBalance: number;
    creditCards: [] | [string];
    id: string;
    type: string;
    loansCollection?: ILoan[];
}