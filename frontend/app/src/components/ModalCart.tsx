import React from 'react';
import { cartContext } from '../providers/cartProvider';
import { ICartItem } from '../reducers/cartReducer';
import Modal from './Modal';
import Product from './Product';

export function ModalCart({...rest}: any){
    const cart = React.useContext(cartContext);

    return <Modal 
        className='modal--cart'
        classShow='modal--cart-show'
        classHidden='modal--cart-hidden'
        {...rest}
    >
        <div className='cart-items'>
            {cart.cartState.items.map((item: ICartItem) => (
            <React.Fragment
                key={`${item.productId}`}
            >
                <Product product={{
                    id: item.productId,
                    images: [{image: item.image}],
                    title: item.name,
                    price: item.price
                }}/>
                <button
                    className='btn btn--red'
                    onClick={() => cart.removeCart(item.productId)}
                >remove</button>
                <br/>
           </React.Fragment>))}
        </div>
        <br/>
        <div>
            <strong>Total: </strong>
            { cart.cartState.totalPrice }
        </div>
    </Modal>;
}