import React from 'react';
import { initialCartState, useCartReducer, ICartItem } from '../reducers/cartReducer';

import CART_REDUCER_TYPES from '../reducers/cartReducer/types';

export const cartContext = React.createContext<any>(initialCartState);

export default function CartProvider({children}: {children: React.ReactNode}){
    const [cartState, cartDispatch] = useCartReducer();


    React.useEffect(() => {
        cartDispatch({
            type: CART_REDUCER_TYPES.INITIAL_CART
        });
    }, []);

    
    React.useEffect(() => {
        if(!cartState.initialized) return;
        
        localStorage.setItem('cart', 
        JSON.stringify(cartState.items));
    },[cartState]);

    const addCart = (product: ICartItem) => {
        cartDispatch({
            type: CART_REDUCER_TYPES.ADD_CART,
            payload: product
        });
    }

    const removeCart = (productId: string) => {
        cartDispatch({
            type: CART_REDUCER_TYPES.REMOVE_CART,
            payload: productId
        });
    }

    return  <cartContext.Provider
                value={{cartState, addCart, removeCart}}
            >
                {children}
            </cartContext.Provider>

}