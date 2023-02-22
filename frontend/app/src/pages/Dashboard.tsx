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
        />
        <div className='ds-content'>
        <button onClick={userContext.handleLogout}>log out</button>
            <Outlet />
        </div>
        
    </div>
}