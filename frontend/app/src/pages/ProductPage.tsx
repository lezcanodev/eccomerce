import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../api/product';
import { BsCartPlus } from 'react-icons/bs';

import './productPage.css';
import { cartContext } from '../providers/cartProvider';
import { ICartItem } from '../reducers/cartReducer';


export default function ProductPage(){
    const product: IProduct | null = useLoaderData() as IProduct;
    const cart = React.useContext(cartContext);

    if(!product){
        return <>Product doesnt exist!!</>;
    }
    
    return <div className='product-page'>
        <div className='product-images'>
            {product.images.map(({image}) => (<React.Fragment  key={`${image}-product-image`}>
                <img src={image} className='img' />
            </React.Fragment>))}
        </div>
        <div className='product-info'>
                <h1 className='product-title'>
                    {product.title}
                </h1>
                <span><strong>category: </strong>{product.category?.name}</span>
                <span className='procut-price'>$ {product.price}</span>
                <div    className='btn btn--normal'           
                        style={{width:'100%', 
                        boxSizing: 'border-box',
                        fontSize:'1.6rem',
                        textAlign: 'center'}}
                        onClick={() => cart.addCart({ quantity: 1, 
                            productId:product.id,
                            name: product.title,
                            price: product.price,
                            image: product.images[0].image})}>
                    {cart.cartState.items.map((p: ICartItem) => (<>
                        {p.productId === product.id ? (
                            <React.Fragment key={`key-${p.productId}-14`}>{p.quantity}</React.Fragment>
                        ): <React.Fragment key={`key-${p.productId}`}></React.Fragment>}
                    </>))}
                    <BsCartPlus/>
                </div>

                <p className='product-description'>
                    {product.description}
                </p>
        </div>
    </div>;
}