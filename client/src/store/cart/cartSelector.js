import { createSelector } from "reselect"

const cartItemsSelectorReducer = (state) => state.cart 

export const cartCountSelector = (state) => state.cart.cartCount

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



