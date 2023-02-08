import USER_REDUCER_TYPES from "./types";
import { IUser } from "../../api/user";

export interface IUserState{
    user: IUser | null,
    isAuth: boolean,
    errors: {[name: string]: string}[]
}


export default  function userReducer(state: IUserState, action: any): IUserState{
    switch(action.type){
        case USER_REDUCER_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case USER_REDUCER_TYPES.SIGN_IN:
            return state;

        case USER_REDUCER_TYPES.SIGN_IN:
            return state;

        case USER_REDUCER_TYPES.SIGN_IN:
            return state;
        default:
            console.log("?????")
            return state;
    }
   
}