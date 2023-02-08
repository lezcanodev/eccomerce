import React from "react";
import {Navigate, Outlet} from 'react-router';
import { UserContext } from "../providers/userProvider";

export default () => {
    const userContext = React.useContext(UserContext);
    
    if(userContext.loading){
        return <>Loading...</>;
    }

    if(userContext.user.isAuth){
        return <Navigate to={'/'}/>
    }

    return <Outlet />;
}