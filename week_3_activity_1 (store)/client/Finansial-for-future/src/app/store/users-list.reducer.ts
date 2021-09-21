import { Action } from "@ngrx/store";
import { IUserNew } from "../shared/interfaces";

const initialState = {
    users: [ ]
 };

export function usersListReducer(state = initialState, action: Action) { 

    switch(action.type) { 
        case 'ADD_USER':
            return { 
                ...state,
                users: [...state.users, action]
            }
    }
}