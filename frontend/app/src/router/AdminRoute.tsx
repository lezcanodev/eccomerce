import React from "react";
import {Navigate, Outlet} from 'react-router';
import { UserRole } from "../enums/userRoles";
import { UserContext } from "../providers/userProvider";

export default () => {
    const userContext = React.useContext(UserContext);
    
    if(userContext.loading){
        return <>Loading...</>;
    }

    if(!userContext.user.isAuth){
        return <Navigate to={'/login'}/>
    }

    console.log()
    if(!(userContext.user.user &&
        userContext.user.user.rol.name === UserRole.ADMIN)){
        return <Navigate to={'/'}/>
    }

    return <Outlet />;
}