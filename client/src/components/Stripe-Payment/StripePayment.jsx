import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/user.selector";
import { cartTotalPriceSelector } from "../../store/cart/cartSelector";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_CLEAR_ALL_CART_ITEMS } from "../../store/cart/cart.actions";
import { useNavigate } from "react-router-dom";

function StripePayment() {
  const currentUser = useSelector(currentUserSelector);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { data } = await axios.post(
      "/stripe/payment",
      {
        amount: totalPrice * 100,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    const clientSecret = data.clientSecret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.user.username,
        },
      },
    });

    if (paymentResult.error) {
      if (
        paymentResult.error.code &&
        paymentResult.error.code === "incomplete_number"
      ) {
        toast.error("incomplete_number", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (
        paymentResult.error.type &&
        paymentResult.error.type === "validation_error"
      ) {
        toast.error("All fields must be filled", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        toast.success("payment successfull ✔", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      await axios.get(`/cart/removeAll`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      dispatch(SET_CLEAR_ALL_CART_ITEMS());
      navigate("/");
    }
  };

  return (
    <div className="my-10 font-sans">
      <form
        className="mt-20 w-[300px] md:w-[500px] mx-auto"
        onSubmit={paymentHandler}
      >
        <h2 className="text-center my-5 text-[1.4rem] md:text-[2rem] font-bold">
          Credit-Card Payment
        </h2>
        <p className="font-semibold text-[18px] text-gray-700 font-mono">
          Welcome{" "}
          {currentUser.user.username.charAt(0).toUpperCase() +
            currentUser.user.username.slice(1)}
          ,{" "}
          <span className="block my-2">
            please do not provide your real bank details here
          </span>{" "}
        </p>
        <p className="text-gray-700 my-4 text-center text-[18px] font-mono ">
          Test: 4242 4242 4242 4242
        </p>
        <CardElement className="w-[80%] mx-auto mt-5" />
        <button
          className="bg-black w-1/2 
           text-white p-2 rounded-md mt-6 mx-auto block hover:bg-gray-700 hover:shadow-lg hover:text-white hover:scale-[0.95]"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default StripePayment;
