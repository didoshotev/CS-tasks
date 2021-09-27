import { Action } from "@ngrx/store";
import { IFormCreateResponse, IUserNew } from "src/app/shared/interfaces";
import { User } from "src/app/shared/models/user.model";

export const ADD_USER = 'ADD_USER';

export class AddUser implements Action { 
    readonly type = ADD_USER;
    
    constructor(public payload: IFormCreateResponse) { }
    
}