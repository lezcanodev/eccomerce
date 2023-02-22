import { useReducer } from 'react';
import cartReducer from './reducer';

export interface ICartItem{
    quantity: number,
    productId: string,
    name: string,
    price: number,
    image: string
}

export interface ICartState{
    items: ICartItem[],
    totalItems: number,
    totalPrice: number,
    initialized: boolean
}

export const initialCartState: ICartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    initialized: false
};

const useCartReducer = (): [any, any] => {
   
    const [state, disptach] = useReducer(cartReducer, initialCartState);
    return [state, disptach];
}


export {useCartReducer};