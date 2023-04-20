import { useCallback } from "react";
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
import { currentUserSelector } from "../../store/user/user.selector";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Card = ({ id, imageUrl, price, name, quantity }) => {
  const cartCount = useSelector(cartCountSelector);
  const isCartLoading = useSelector(cartLoadingSelector);
  const currentUser = useSelector(currentUserSelector);
  const cartData = useSelector(getCartItems);
  const dispatch = useDispatch();

  const removeItemFromCart = useCallback(
    async (id) => {
      try {
        const cartItemToDelete = await axios.delete(
          `http://localhost:8000/cart/${id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
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
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
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
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        dispatch(ADD_ITEM_INTO_CART(updatedCartItem));
        dispatch(CART_INCREMENT_CART_COUNT(cartCount - 1));
      } catch (err) {
        dispatch(SET_CART_ITEMS_FAILED(err));
      }
    },
    [cartData]
  );


  return (
    <>
      {!isCartLoading ? (
        <div className="relative flex flex-col md:flex-row justify-center items-center mt-10 border-2 uppercase font-mono font-bold text-xl p-5 tracking-wide">
          <div className="w-30%">
            <img
              className="w-[200px] rounded-md hover:opacity-[.5] hover:cursor-pointer transition-opacity"
              src={imageUrl}
              alt={name}
            />
            <p className="text-center mt-5">{name}</p>
          </div>
          <div className="w-full md:w-[20%] md:ml-10  flex justify-between items-center my-5">
            <div
              onClick={() => updateCartQuantityBy1(id)}
              className=" text-white hover:cursor-pointer w-[30px] h-[30px] rounded-[50%] bg-green-600 flex justify-center items-center"
            >
              +
            </div>
            <p>{quantity}</p>
            <div
              onClick={() => removeCartQuantityBy1(id)}
              className="text-white hover:cursor-pointer w-[30px] h-[30px] rounded-[50%] bg-red-600 flex justify-center items-center"
            >
              -
            </div>
          </div>
          <p className="mt-5 absolute top-[75%]">${price}</p>
          <div className="mt-20 md:mt-0 md:ml-20">
            <button
              onClick={() => removeItemFromCart(id)}
              className="bg-black text-white p-2 w-[250px] md:w-[200px] rounded-sm hover:cursor-pointer hover:bg-white hover:text-black border-2 border-gray-400"
            >
              <DeleteOutlineIcon
                onClick={() => removeItemFromCart(id)}
                className="mr-2"
              />
              remove
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Card;
