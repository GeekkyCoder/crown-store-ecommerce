import CART_ACTION_TYPES from "./cart.actionTypes";

export const ADD_ITEM_INTO_CART = (payload) => {
    return {type:CART_ACTION_TYPES.ADD_TO_CART,payload:payload}
}

export const SET_CART_ITEMS_START = () => {
    return {type:CART_ACTION_TYPES.SET_CART_ITEMS_START}
}

export const SET_CART_ITEMS_SUCCESS = (cartItems) => {
    return {type:CART_ACTION_TYPES.SET_CART_ITEMS_SUCCESS,payload:cartItems}
}

export const SET_CART_ITEMS_FAILED = (err) => {
    return {type:CART_ACTION_TYPES.SET_CART_ITEMS_FAILED,payload:err}
}

export const CART_INCREMENT_CART_COUNT = (count) => {
    return {
        type:CART_ACTION_TYPES.INCREMENT_CART_ITEM_COUNT,
        payload:count
    }
}

export const SET_CART_OPEN = () => {
    return {type:CART_ACTION_TYPES.SET_CART_OPEN}
}

export const REMOVE_FROM_CART = () => {
    return {type:CART_ACTION_TYPES.REMOVE_FROM_CART}
}