import React from 'react';
import InputText from '../../components/InputText';
import InputWithIcon from '../../components/InputWithIcon';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/userProvider';
import { UserRole } from '../../enums/userRoles';
import { AiFillDashboard, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineLogin } from 'react-icons/ai'; 

import './header.css';
import { ModalCart } from '../../components/ModalCart';
import { cartContext } from '../../providers/cartProvider';
import { useModal } from '../../hooks/useModal';

export default function Header({setQuery, defaultQuery}: {setQuery?: ((query:string) => void), defaultQuery?: string}){
    const userContext = React.useContext(UserContext);
    const cart = React.useContext(cartContext);
    const [handleOpenCart, handleCloseCart, openCart] = useModal();
    const [newQuery, setNewQuery] = React.useState<string>('');
    const navigate = useNavigate();

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setNewQuery(newQuery);
        if(typeof setQuery !== 'undefined'){
            setQuery(newQuery);
            return;
        }
    }


    return <>
        <header className='header'>
            <div className='header-logo'>
                <Link
                    style={{textDecoration:'none'}}
                    to='/'
                >
                    <span>Tienda.com</span>
                </Link>
                
            </div>
            <div className='header-body'>
                <div className='header-body-search'>
                    <InputWithIcon
                        icon={<AiOutlineSearch 
                            style={{cursor:'pointer'}}
                            onClick = {() => navigate(`/?query=${newQuery}`)}
                        />}
                    >
                        <InputText
                            onInput = {(e: any) => handleQuery(e)}
                            name='search'
                            defaultValue={defaultQuery ?? ''}
                            placeholder='Look for your product'
                        />
                    </InputWithIcon>
                </div>
                <div className='header-body-actions'>
                    <button
                        className='btn btn--icon'
                    >
                        <span className='cart-amount-items'>
                            { cart.cartState.totalItems }
                        </span>

                        <AiOutlineShoppingCart 
                            className='btn--icon-icon'
                            onClick={handleOpenCart}
                        />
                
                    </button>
                    
                </div>

           
            </div>
            <div className='header-footer'>
                {(userContext.user.isAuth) ? (
                    <>
                        <span 
        
                        >{userContext.user.user?.nick}</span>
                        {(userContext.user.user?.rol.name === UserRole.ADMIN) ? (
                            <>
                                <Link
                                    to='/dashboard'
                                >
                                    <AiFillDashboard 
                                        className='btn'
                                        style={{paddingBottom:0}}
                                    />
                                </Link>
                            </>
                        ) : (<></>)}
                        <AiOutlineLogin
                            className='btn'
                            style={{paddingBottom:0}}
                            onClick={userContext.handleLogout}
                        />
                    </>
                ) : (
                (userContext.loading) ? (
                    <>...</>
                ) : (
                    <>
                        <Link
                            to='/login'
                        >
                            Login
                        </Link>
                        &nbsp;|&nbsp;
                        <Link
                            to='/register'
                        >
                        Register
                        </Link>
                    </>
                )

                )}

                  
            </div>
        </header>
        {openCart && <ModalCart 
            state={openCart}
            handleOpen={handleOpenCart}
            handleClose={handleCloseCart}
                />}
    </>
}