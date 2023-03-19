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
    fetchCartData()
  }, []);



  return (
    <>
        <div>
            {
                cartData && cartData.map(({id,name,imageUrl,price}) => {
                    return (
                        <div>
                            {name}
                            <img src={imageUrl} alt={name} />
                            <p>{price}</p>
                            <buton>remove</buton>
                        </div>  
                    )
                })
            }
        </div>    
   </>);
};

export default Cart;
