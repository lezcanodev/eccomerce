import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../components/dashboard/Aside';
import { UserContext } from '../providers/userProvider';

import './dashboard.css';

export default function Dashboard(){
    const userContext = React.useContext(UserContext);

    return <div className='ds'>

        <Aside
            user={userContext.user.user}
            logout={userContext.handleLogout}
        />
        <div className='ds-content'>
            <Outlet />
        </div>
        
    </div>
}