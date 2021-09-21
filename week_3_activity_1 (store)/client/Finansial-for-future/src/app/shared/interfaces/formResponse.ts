export interface IFormCreateResponse { 
    firstName: string;
    middleName: string;
    lastName: string;
    streetAddress: string;
    moneyBalance: number;
    creditCards?: [string] | [];
}