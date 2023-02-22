import React, { createContext, useState, useEffect } from "react";
import USER_REDUCER_TYPES, { useUserReducer, initialState } from "../reducers/userReducer";
import { IUserState } from "../reducers/userReducer/reducer";
import { getUser } from "../api/user";
import { logout } from "../api/auth";

interface IUserContext{
    user: IUserState,
    dispatch: React.Dispatch<any>, //<---
    loading: boolean
}

export const UserContext = createContext<any>({
    user: initialState,
    dispatch: () => {},
    loading: true
});

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [userState, dispatchUser] = useUserReducer();
    const [loading, setLoding] = useState(true);

    const handleGetUser = async () => {
        setLoding(true);
        const user = await getUser();
        setLoding(false);

        if(user.user){
            dispatchUser({ type: USER_REDUCER_TYPES.SET_USER, payload: user.user });
        }
    }

    const handleLogout = async () => {
        logout().then(res => {
            dispatchUser({type: USER_REDUCER_TYPES.LOGOUT});
        });
    }


    useEffect( () => {        
        handleGetUser();
    }, []);

    return <UserContext.Provider
        value={{
            user: {...userState},
            dispatch: dispatchUser,
            handleGetUser,
            handleLogout,
            loading
        }}
    >
        { children }
    </UserContext.Provider>

}

export default UserProvider;