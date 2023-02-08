import { useReducer } from 'react';
import USER_REDUCER_TYPES from './types';
import userReducer, { IUserState } from './reducer';

export const initialState: IUserState = {
    user: null,
    isAuth: false,
    errors: []
}

const useUserReducer = (): [
    any, any
] => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    
    return [state, dispatch];
}

export default USER_REDUCER_TYPES;
export { useUserReducer };