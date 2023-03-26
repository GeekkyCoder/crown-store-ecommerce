import { useState, Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../Assets/crown.svg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/cart/cartSelector";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SET_CART_OPEN } from "../../store/cart/cart.actions";
import CartMenu from "../CartMenu/CartMenu";
import { currentUserSelector } from "../../store/user/user.selector";
import AccountMenu from "../Profile/Profile";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const [state, setState] = useState({
    right: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector(getCartItems);
  const currentUser = useSelector(currentUserSelector);

  const toggleDrawer = (anchor, open) => (event) => {
    dispatch(SET_CART_OPEN());
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  const checkoutRouteHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="flex items-center p-5 mt-5 font-sans uppercase font-bold bg-white shadow-lg">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>

        <div className="ml-auto flex gap-10 items-center">
          <Link to={"/shop"} className="text-gray-500 hover:text-black">
            Shop
          </Link>
          <Link to={"/auth"} className="text-gray-500 hover:text-black">
            Sign in
          </Link>

          {["right"].map((anchor) => (
            <Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
                <div>
                  {cartData.map((cartItem) => {
                    return (
                      <div
                        className="flex flex-col text-gray-500"
                        key={cartItem.id}
                      >
                        <CartMenu item={cartItem} />
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={checkoutRouteHandler}
                  className="p-2 block w-[50%] mx-auto my-2 font-mono uppercase bg-black text-white shadow-md hover:scale-[1.1] transition-all rounded-md"
                >
                  Checkout
                </button>
              </Drawer>
            </Fragment>
          ))}

          {currentUser ? <AccountMenu /> : <p>not logged in</p>}
          {cartData.length ? (
            <div>
              {/* <div>{cartData.length}</div> */}
              <Badge badgeContent={cartData.length} color="primary">
                <ShoppingCartIcon
                  onClick={toggleDrawer("right", true)}
                  fontSize="large"
                />
              </Badge>
            </div>
          ) : (
            <ShoppingCartOutlinedIcon fontSize="large" />
          )}
        </div>
      </div>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default Navbar;
