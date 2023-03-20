import { useCallback, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_ITEM_INTO_CART,
  CART_INCREMENT_CART_COUNT,
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_SUCCESS,
} from "../../store/cart/cart.actions";

import {
  getCartItems,
  cartCountSelector,
  cartLoadingSelector,
} from "../../store/cart/cartSelector";
import Loader from "../Loader/Loader";

const Cart = () => {
  const cartData = useSelector(getCartItems);
  const cartCount = useSelector(cartCountSelector);
  const isCartLoading = useSelector(cartLoadingSelector);
  const dispatch = useDispatch();

  const removeItemFromCart = useCallback(
    async (id) => {
      try {
        const cartItemToDelete = await axios.delete(
          `http://localhost:8000/cart/${id}`
        );
        const newCartItems = cartData.filter(
          (cartItem) => cartItem.id !== cartItemToDelete.data.id
        );
        dispatch(SET_CART_ITEMS_SUCCESS(newCartItems));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err));
      }
    },
    [cartData]
  );

  const updateCartQuantityBy1 = useCallback(
    async (productId) => {
      //update the quantityBy1
      const items = cartData.map((cartItem) => {
        return cartItem.id === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem;
      });

      const product = items.find((cartItem) => cartItem.id === productId);

      try {
        const updatedCartItem = await axios.put(
          `http://localhost:8000/cart/${product.id}`,
          {
            quantity: product.quantity,
          }
        );
        dispatch(ADD_ITEM_INTO_CART(updatedCartItem));
        dispatch(CART_INCREMENT_CART_COUNT(cartCount + 1));
      } catch (err) {
        console.log(err);
      }
    },
    [cartData]
  );

  const removeCartQuantityBy1 = useCallback(
    async (productId) => {
      //update the quantityBy1
      const items = cartData.map((cartItem) => {
        return cartItem.id === productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem;
      });

      const product = items.find((cartItem) => cartItem.id === productId);

      try {
        const updatedCartItem = await axios.put(
          `http://localhost:8000/cart/${product.id}`,
          {
            quantity: product.quantity,
          }
        );
        dispatch(ADD_ITEM_INTO_CART(updatedCartItem));
        dispatch(CART_INCREMENT_CART_COUNT(cartCount - 1));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err))
      }
    },
    [cartData]
  );

  return (
    <>
      {!isCartLoading ? (
        <div>
          {cartData.length ? (
            cartData.map(({ id, name, imageUrl, price, quantity }) => {
              return (
                <div key={id}>
                  {name}
                  <img src={imageUrl} alt={name} />
                  <p>{price}</p>
                  <p>{quantity}</p>
                  <button onClick={() => removeItemFromCart(id)}>remove</button>
                  <button
                    onClick={() => updateCartQuantityBy1(id)}
                    className="bg-white shadow-md p-2 m-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeCartQuantityBy1(id)}
                    className="bg-white shadow-md p-2"
                  >
                    -
                  </button>
                </div>
              );
            })
          ) : (
            <div>laoding....</div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cart;
