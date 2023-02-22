import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { cartContext } from '../providers/cartProvider';
import './product.css';

export default function Product({product}: any){

    const cart = React.useContext(cartContext);

    return(
        <div className='product'>

            <figure className='product-image'>
                <Link to={`product/${product.id}`}
                style={{textDecoration: 'none'}}>
                <img    className='img' 
                        src={product.images[0].image} />
                </Link>
            </figure>
            <div className='product-header'>
                <Link to={`product/${product.id}`}
                style={{textDecoration: 'none'}}>
                    <h2 className='product-title'>
                        {product.title}
                    </h2>
                </Link>
                <span className='product-price'>
                   $ {product.price}
                </span> 
            </div>
            
            <div className='product-actions'>
                <div className='product-action'
                    onClick={() => cart.addCart({ quantity: 1, 
                        productId:product.id,
                        name: product.title,
                        price: product.price,
                        image: product.images[0].image})}
                >
                        {cart.cartState.items.filter( (item: any) => (
                                item.productId === product.id
                        ))[0]?.quantity}
                        <BsCartPlus />
                </div>
            </div>
        </div>
    );
}