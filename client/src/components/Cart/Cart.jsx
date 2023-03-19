import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
} from "../../store/cart/cart.actions";

import { getCartItems } from "../../store/cart/cartSelector";

const Cart = () => {
  const cartData = useSelector(getCartItems);
  const dispatch = useDispatch();

  const removeItemFromCart = async (id) => {
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
  };

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(SET_CART_ITEMS_START());
      try {
        const data = await axios.get("http://localhost:8000/cart");
        const cartItems = data.data;
        dispatch(SET_CART_ITEMS_SUCCESS(cartItems));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err));
      }
    };
    fetchCartData();
  }, []);


  console.log(cartData)

  return (
    <>
      <div>
        {cartData.length ?
          cartData.map(({ id, name, imageUrl, price }) => {
            return (
              <div key={id}>
                {name}
                <img src={imageUrl} alt={name} />
                <p>{price}</p>
                <button onClick={() => removeItemFromCart(id)}>remove</button>
              </div>
            );
          })
        :
        <div>
            laoding....
        </div>
        }
      </div>
    </>
  );
};

export default Cart;
