import React from 'react';
import { FaDropbox, FaTags } from 'react-icons/fa';

import './aside.css';
import { Link } from 'react-router-dom';
import { IUser } from '../../api/user';

export default function Aside({user, logout}: {user: IUser | null, logout: () => void}){

    return <aside className='ds__aside'>
        <div className='ds__user'>
            <figure className='ds__user__image'>
                <img src="http://localhost:3002/uploads/b6jUNGz3G9UWkvsAiu4y1.jpeg" alt="" className='img' />
            </figure>
            <p className='ds__user__info'>
                <span> {user?.nick} </span> - {user?.rol.name.toLowerCase()}
            </p>
            <div style={{fontSize:".8rem"}}>
                <Link to='/'>View page</Link>
            </div>
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
            <button onClick={logout} className='btn ds__item'
                style={{marginTop:250}}
            >
                <span className='ds__item__name'>log out</span>
            </button>

        </div>

    </aside>
}