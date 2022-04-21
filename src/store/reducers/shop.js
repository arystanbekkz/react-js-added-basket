import {ADD_TO_BASKET, SET_PRODUCTS, REMOVE_FROM_BASKET} from '../actions/shopActions'

const initState = {
    products: [],
    basket: JSON.parse(localStorage.getItem('basket')) || [],
}
export function shop(state = initState, action) {
    const newState = {...state}
    switch (action.type) {
        case SET_PRODUCTS:
            newState.products = action.payload;
            break;
        case ADD_TO_BASKET:
            newState.basket = newState.basket.find(basketItem => basketItem.productDescr.id === action.payload.productDescr.id) ?
                newState.basket.filter((item) => {
                    if (item.productDescr.id === action.payload.productDescr.id) {
                        item.quantity = item.quantity + 1;
                    }
                    return true;
                }) :
                [...newState.basket, action.payload];
            break;
        case REMOVE_FROM_BASKET:
            newState.basket = newState.basket.find(basketItem => basketItem.productDescr.id === action.payload.id) ?
                newState.basket.filter((item) => {
                    if (item.productDescr.id === action.payload.id) {
                        if (item.quantity === 1) {
                            return false;
                        } else {
                            item.quantity = item.quantity - 1;
                            return true;
                        }
                    }
                    return true;
                }) :
                [...newState.basket];
            break;
        default:
            return state
    }
    localStorage.setItem('basket', JSON.stringify(newState.basket))
    return newState;
}
