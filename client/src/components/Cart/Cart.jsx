import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
        dispatch(SET_CART_ITEMS_FAILED(err));
      }
    },
    [cartData]
  );

  return (
    <>
      {!isCartLoading ? (
        <div>
          {cartData.length ? (
            <TableContainer
              sx={{
                maxWidth: " 95%",
                marginLeft: "auto",
                marginRight: "auto",
                textTransform: "uppercase",
              }}
              className="mt-10"
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell className="flex-1 font-mono">id</TableCell>
                    <TableCell className="flex-1 font-mono ">name</TableCell>
                    <TableCell className="flex-1 font-mono ">image</TableCell>
                    <TableCell className="flex-1 font-mono ">
                      quantity
                    </TableCell>
                    <TableCell className="flex-1 font-mono ">price</TableCell>
                    <TableCell className="flex-1 font-mono ">actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.map(({ id, name, imageUrl, price, quantity }) => (
                    <TableRow
                      key={id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TableCell className="flex-1" component="th" scope="row">
                        {id}
                      </TableCell>
                      <TableCell className="flex-1">{name}</TableCell>
                      <TableCell className="flex-1" align="right">
                        <img className="w-[100px]" src={imageUrl} alt={name} />
                      </TableCell>
                      <TableCell className="flex-1">
                        <div className="flex justify-between items-center w-[100px] ml-8">
                          <button
                            className="bg-gray-200 text-gray-900 flex justify-center items-center p-2 rounded-[50%] w-[30px] h-[30px] font-mono"
                            onClick={() => updateCartQuantityBy1(id)}
                          >
                            +
                          </button>
                          {quantity}
                          <button
                            className="bg-gray-200 text-black flex justify-center items-center p-2 rounded-[50%] w-[30px] h-[30px] font-mono"
                            onClick={() => removeCartQuantityBy1(id)}
                          >
                            -
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="flex-1 ml-12">{price}</TableCell>
                      <TableCell className="flex-1 ">
                        <Chip
                          color="error"
                          icon={<DeleteOutlineIcon />}
                          className="w-[120px]"
                          variant="contained"
                          label="remove"
                          onClick={() => removeItemFromCart(id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>No items in cart</div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cart;
