import { Action } from "@ngrx/store";
import { IUserNew } from "../../shared/interfaces";
import * as UsersListActions from '../actions/users-list-actions';

const initialState = {
    users: [ ]
 };

export function usersListReducer(state = initialState, action: UsersListActions.AddUser) { 

    switch(action.type) { 
        case UsersListActions.ADD_USER:
            console.log(action);
            
            return { 
                ...state,
                users: [...state.users, action.payload]
            }
            default:
                return state;
        }  
}