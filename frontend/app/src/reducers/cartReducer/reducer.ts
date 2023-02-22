import CART_REDUCER_TYPES from "./types";
import { ICartItem, ICartState } from ".";

export default function cartReducer(state: ICartState, action: any): ICartState{
    switch(action.type){
        case CART_REDUCER_TYPES.INITIAL_CART:
            const items = JSON.parse(localStorage.getItem('cart') ?? '[]');
            
            const totals = items.reduce((acc: {
                totalPrice: number, totalItems: number
            }, item: ICartItem) => {
                return {
                    totalPrice: acc.totalPrice + item.price*item.quantity,
                    totalItems: acc.totalItems + item.quantity
                };
            }, {
                totalPrice: 0,
                totalItems: 0
            });

            return {
                ...state,
                items,
                totalPrice: totals.totalPrice, 
                totalItems: totals.totalItems,
                initialized: true
            }
        case CART_REDUCER_TYPES.ADD_CART:
            let exist = false;
            let newItems: ICartItem[] = state.items.map((item: ICartItem) => {
                if(action.payload.productId === item.productId){
                    exist = true;
                    return {
                        ...item,
                        quantity: item.quantity+1
                    }
                }
                return item;
            });

            if(!exist){
                newItems = [...state.items, action.payload];
            }

            return {
                ...state,
                items: newItems,
                totalItems: state.totalItems+1,
                totalPrice: state.totalPrice + action.payload.quantity*action.payload.price
            }
        case CART_REDUCER_TYPES.REMOVE_CART:
            let lessPrice: number = 0;

            const itemsWithoutOne = state.items.reduce((acc: ICartItem[], item: ICartItem) => {
                    if(item.productId === action.payload){
                        lessPrice = item.price;
                        if(item.quantity - 1 > 0){
                            acc.push({...item, quantity: item.quantity-1})
                        }
                    }else{
                        acc.push(item);
                    }

                    return acc;
            }, []);

            return {
                ...state,
                totalItems: Math.abs(state.totalItems-1),
                items: itemsWithoutOne,
                totalPrice: state.totalPrice - lessPrice
            }

        default:
            return state
    }
}
