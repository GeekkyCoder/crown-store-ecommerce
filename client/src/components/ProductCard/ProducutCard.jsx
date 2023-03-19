import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isLoadingSelector } from "../../store/catogories/catogoriesSelector";
import {
  ADD_ITEM_INTO_CART,
  SET_CART_ITEMS_FAILED,
} from "../../store/cart/cart.actions";
import { getCartItems } from "../../store/cart/cartSelector";
import { Fragment } from "react";

const ProductCard = ({ product }) => {
  const isLoading = useSelector(isLoadingSelector);
  const cartData = useSelector(getCartItems);
  const { id, name, imageUrl, price } = product;
  const dispatch = useDispatch();

  const addToCart = async (productToAdd) => {
    // check for item if it already exist in the cart db
     const itemExist = cartData.find(cartItem => {
      return cartItem.id === productToAdd.id
     })

     console.log(itemExist)

    if (!itemExist) {
      const newItems = [...cartData, { ...productToAdd, quantity: 1 }];
      try {
        const cartItem = await axios.post("http://localhost:8000/cart", {
          id: newItems[0].id,
          name: newItems[0].name,
          imageUrl: newItems[0].imageUrl,
          price: newItems[0].price,
          quantity: newItems[0].quantity,
        });

        dispatch(ADD_ITEM_INTO_CART(cartItem.data));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err));
      }
    } else {
      const newItem = cartData.find((cartItem) => {
        // look for the the cart item in productsdb
        return cartItem.id === productToAdd.id
          ? { ...productToAdd, quantity: cartItem.quantity + 1 }
          : 1;
      });
      try {
        const cartItem = await axios.post("http://localhost:8000/cart", {
          id: newItem.id,
          name: newItem.name,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity:newItem.quantity,
        });
        dispatch(ADD_ITEM_INTO_CART(cartItem.data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Fragment key={id}>
      {!isLoading ? (
        <div className="flex-1 relative w-full shadow-lg hover:scale-[1.1] transition-transform">
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
      ) : (
        <div className="w-[400px] h-[400px] bg-red-500 ">Loading...</div>
      )}
    </Fragment>
  );
};

export default ProductCard;
