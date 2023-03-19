import { createSelector } from "reselect"

const cartItemsSelectorReducer = (state) => state.cart 

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



