import React, { createContext, useState, useEffect } from "react";
import USER_REDUCER_TYPES, { useUserReducer, initialState } from "../reducers/userReducer";
import { IUserState } from "../reducers/userReducer/reducer";
import { getUser } from "../api/user";


interface IUserContext{
    user: IUserState,
    dispatch: any,
    loading: boolean
}

export const UserContext = createContext<IUserContext>({
    user: initialState,
    dispatch: null,
    loading: true
});

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [userState, dispatchUser] = useUserReducer();
    const [loading, setLoding] = useState(true);

    useEffect( () => {
     
        const handleGetUser = async () => {
            setLoding(true);
            const user = await getUser();
            setLoding(false);

            if(user.user){
                dispatchUser({ type: USER_REDUCER_TYPES.SET_USER, payload: user.user });
            }
        }
        
        handleGetUser();
    }, []);

    return <UserContext.Provider
        value={{
            user: {...userState},
            dispatch: dispatchUser,
            loading
        }}
    >
        { children }
    </UserContext.Provider>

}

export default UserProvider;