import React from 'react';
import { FaDropbox, FaTags } from 'react-icons/fa';

import './aside.css';
import { Link } from 'react-router-dom';
import { IUser } from '../../api/user';

export default function Aside({user}: {user: IUser | null}){

    return <aside className='ds__aside'>
        <div className='ds__user'>
            <figure className='ds__user__image'>
                <img src="http://localhost:3002/uploads/b6jUNGz3G9UWkvsAiu4y1.jpeg" alt="" className='img' />
            </figure>
            <p className='ds__user__info'>
                <span> {user?.nick} </span> - {user?.rol.name.toLowerCase()}
            </p>
        </div>
        <div className='ds__items'>
            <Link to='product' className='ds__item'>
                <span className='ds__item__icon'><FaDropbox/></span>
                <span className='ds__item__name'>Products</span>
            </Link>
            <Link to='category' className='ds__item'>
                <span className='ds__item__icon'><FaTags/></span>
                <span className='ds__item__name'>Categories</span>
            </Link>
        </div>

    </aside>
}