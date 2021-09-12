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