import { useEffect } from "react";

import Card from "../Card/Card";

import { useSelector, useDispatch } from "react-redux";

import {
  getCartItems,
  cartTotalPriceSelector,
} from "../../store/cart/cartSelector";
import { currentUserSelector } from "../../store/user/user.selector";
import { SET_CART_TOTAL_PRICE } from "../../store/cart/cart.actions";
import StripePayment from "../Stripe-Payment/StripePayment";

const Cart = () => {
  const cartData = useSelector(getCartItems);
  const currentUser = useSelector(currentUserSelector);
  const cartPrice = useSelector(cartTotalPriceSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const newPrice = cartData.reduce((acc, item) => {
      const price = Number(item.price) * item.quantity + acc;
      return price;
    }, 0);
    dispatch(SET_CART_TOTAL_PRICE(newPrice));
  }, [cartData]);

  return (
    <>
      {cartData.length ? (
        <div className="w-full md:w-[70%] mx-auto p-10 ">
          <h1 className="text-center uppercase font-mono text-xl md:text-4xl font-bold my-5">
            Your Cart
          </h1>
          {cartData.map(({ id, name, imageUrl, price, quantity }) => {
            return (
              <Card
                key={id}
                id={id}
                name={name}
                imageUrl={imageUrl}
                price={price}
                quantity={quantity}
              />
            );
          })}
          <div className="flex justify-end ml-auto  uppercase text-2xl font-bold mt-20">
            Your Sub Total : ${cartPrice}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen uppercase font-sans text-4xl font-bold">
          No item to show
        </div>
      )}
      <StripePayment/>
    </>
  );
};

export default Cart;
