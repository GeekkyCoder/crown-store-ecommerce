import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  ADD_ITEM_INTO_CART,
  CART_INCREMENT_CART_COUNT,
  SET_CART_ITEMS_FAILED,
} from "../../store/cart/cart.actions";
import { cartCountSelector, getCartItems } from "../../store/cart/cartSelector";
import { Fragment, useCallback } from "react";
import { toast } from "react-toastify";
import { currentUserSelector } from "../../store/user/user.selector";

const ProductCard = ({ product }) => {
  const cartData = useSelector(getCartItems);
  const currentUser = useSelector(currentUserSelector)
  const cartCount = useSelector(cartCountSelector);
  const { id, name, imageUrl, price } = product;
  const dispatch = useDispatch();

  // console.log(currentUser)


  const addToCart = useCallback(
    async (productToAdd) => {
      try {
        const cartItem = await axios.post(`http://localhost:8000/cart`, {
          id: productToAdd.id,
          name: productToAdd.name,
          imageUrl: productToAdd.imageUrl,
          price: productToAdd.price,
        },{
          headers:{
            Authorization:`Bearer ${currentUser.token}`
          }
        });
        toast.success("product added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(ADD_ITEM_INTO_CART(cartItem.data));
        dispatch(CART_INCREMENT_CART_COUNT(cartCount + 1));
      } catch (err) {
        SET_CART_ITEMS_FAILED(err)
      }
    },
    [cartData]
  );

  return (
    <Fragment key={id}>
        <div className="flex-1 relative w-full shadow-lg hover:scale-[1.1] transition-transform">
          <div
          className="bg-gray-400 hover:bg-gray-100"
            style={{
              backgroundImage: `url(${imageUrl})`,
              width: "100%",
              height: "300px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode:"multiply"
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
    </Fragment>
  );
};

export default ProductCard;
