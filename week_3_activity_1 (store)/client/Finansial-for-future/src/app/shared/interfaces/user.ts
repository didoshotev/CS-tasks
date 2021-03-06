import { ILoan } from "./loan";

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