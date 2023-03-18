import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  ADD_ITEM_INTO_CART,
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
} from "../../store/cart/cart.actions";
import axios from "axios";
import getCartItems from "../../store/cart/cartSelector";
import { isLoadingSelector } from "../../store/catogories/catogoriesSelector";

const ProductCard = ({ product }) => {
  const cartData = useSelector(getCartItems);
  const isLoading = useSelector(isLoadingSelector)
  const { id, name, imageUrl, price } = product;
  const dispatch = useDispatch();


  const addToCart = async (productToAdd) => {
    try {
      const cartItem = await axios.post("http://localhost:8000/cart", {
        id: productToAdd.id,
        name: productToAdd.name,
        imageUrl: productToAdd.imageUrl,
        price: productToAdd.price,
      });
      dispatch(ADD_ITEM_INTO_CART(cartItem.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // get all cart items
    const fetchCartData = async () => {
       dispatch(SET_CART_ITEMS_START())
      try {
        const data = await axios.get("http://localhost:8000/cart");
        const cartItems = data.data;
         dispatch(SET_CART_ITEMS_SUCCESS(cartItems));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err))
      }
    };
    fetchCartData();
    console.log(cartData)
  }, []);



  return (
    <>
    {!isLoading ?  <div className="flex-1 relative w-full shadow-lg hover:scale-[1.1] transition-transform">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            width: "100%",
            height: "300px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>{" "}
        <div className="absolute top-[40%] bottom-[40%] left-[30%] my-auto mx-auto">
          <button
            onClick={() => addToCart(product)}
            className="bg-white shadow-lg opacity-[.5] rounded-md uppercase font-bold font-sans p-4 hover:opacity-[.7]"
          >
            add to cart
          </button>
        </div>
        <div className="flex justify-evenly items-center uppercase font-mono text-xl font-medium  my-2">
          <p>{name}</p>
          <p>
            {price}{" "}
            <span className="uppercase text-green-500 font-bold">pkr</span>
          </p>
        </div>
      </div>
      :
      <div className="w-[400px] h-[400px] bg-red-500 ">
        Loading...
      </div>
      }
    </>
  );
};

export default ProductCard;
