import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../components/dashboard/Aside';
import { UserContext } from '../providers/userProvider';

export default function Dashboard(){
    const userContext = React.useContext(UserContext);

    return <div style={{
        display:'grid',
        gridTemplateColumns:'auto 1fr'
    }}>
        <Aside
            user={userContext.user.user}
        />
        <div style={{
            width: '100%',
            overflowY: 'auto'
        }}>
            <Outlet />
        </div>
        
    </div>
}