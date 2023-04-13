import { useSelector } from "react-redux";

import { getCartItems } from "../../store/cart/cartSelector";

import Card from "../Card/Card";

const Cart = () => {
  const cartData = useSelector(getCartItems);

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
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen uppercase font-sans text-4xl font-bold">
          No item to show
        </div>
      )}
    </>
  );
};

export default Cart;
