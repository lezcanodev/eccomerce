import React from 'react';

export default function InputWithIcon({icon, children}: {
    icon: React.ReactNode,
    children: React.ReactNode
}){
    return (
    <div className='input-with-icon'>
        <div className='input-with-icon-input'>
            {children}
        </div>
        <div className='input-with-icon-icon'>
            {icon}
        </div>
    </div>
    )
}