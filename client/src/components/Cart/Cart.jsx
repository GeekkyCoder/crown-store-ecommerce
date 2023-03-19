import axios from "axios";
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



  return (
    <>
      <div>
        {cartData.length ?
          cartData.map(({ id, name, imageUrl, price,quantity }) => {
            return (
              <div key={id}>
                {name}
                <img src={imageUrl} alt={name} />
                <p>{price}</p>
                <p>{quantity}</p>
                <button onClick={() => removeItemFromCart(id)}>remove</button>
                <button className="bg-white shadow-md p-2 m-2">+</button>
                <button className="bg-white shadow-md p-2">-</button>
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
