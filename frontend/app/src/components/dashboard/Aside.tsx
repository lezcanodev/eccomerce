import React from 'react';
import { FaDropbox, FaTags, FaUser } from 'react-icons/fa';
import { BsNutFill } from 'react-icons/bs';

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
            <Link to='order' className='ds__item'>
                <span className='ds__item__icon'><FaUser/></span>
                <span className='ds__item__name'>Orders</span>
            </Link>
            <Link to='configuration' className='ds__item'>
                <span className='ds__item__icon'><BsNutFill/></span>
                <span className='ds__item__name'>Configuration</span>
            </Link>
        </div>

    </aside>
}