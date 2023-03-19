import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "../../components/Shop/Shop";
import Directory from "../../components/Directory/Directory.jsx";
import Cart from "../../components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
} from "../../store/cart/cart.actions";
import {
  fetch_Catogories_fail,
  fetch_catogories_success,
  fetch_catogries_start,
} from "../../store/catogories/catogories.actions";

const Home = () => {
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="mx-auto w-full md:max-w-[90%]">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Directory />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Home;
