import { createSelector } from "reselect"

const cartItemsSelectorReducer = (state) => state.cart 

export const cartCountSelector = (state) => state.cart.cartCount

export const cartLoadingSelector = (state) => state.cart.isLoading

export const cartOpenSelector = (state) => state.cart.cartOpen

export const cartTotalPriceSelector = (state) => state.cart.totalPrice

const selectCart = createSelector(
    [cartItemsSelectorReducer],
    (cartSlice) => cartSlice.cartItems
)

export const getCartItems = createSelector(
    [selectCart],
    (cartItems) => {
      console.log("cart selector fired")
      return cartItems
    }
)



