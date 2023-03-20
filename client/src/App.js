import Home from "./pages/Home/Home";
import "./App.css";
import axios from "axios";
import {
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_FAILED,
} from "./store/cart/cart.actions";

import {
  fetch_catogries_start,
  fetch_catogories_success,
  fetch_Catogories_fail,
} from "./store/catogories/catogories.actions";

import { useDispatch, useSelector } from "react-redux";
import { cartCountSelector } from "./store/cart/cartSelector";

import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const cartCount = useSelector(cartCountSelector);

  useEffect(() => {
    const fetchCatogories = async () => {
      dispatch(fetch_catogries_start());
      try {
        const data = await axios.get("http://localhost:8000/products");
        dispatch(fetch_catogories_success(data.data));
      } catch (err) {
        dispatch(fetch_Catogories_fail(err));
      }
    };
    fetchCatogories();
  }, []);

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
  }, [cartCount]);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
