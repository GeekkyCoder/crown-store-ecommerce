import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../Assets/crown.svg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { getCartItems } from "../../store/cart/cartSelector";

const Navbar = () => {
  const cartData = useSelector(getCartItems)

  return (
    <>
      <div className="flex items-center p-5 mt-5 font-sans uppercase font-bold bg-white shadow-lg">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>

        <div className="ml-auto flex gap-10 items-center">
          <Link to={"/shop"} className="text-gray-500 hover:text-black" >
            Shop
          </Link>
          <Link className="text-gray-500 hover:text-black">Sign in</Link>
      {cartData.length ? <Link  to={"/cart"} >
          <div>{cartData.length}</div>
          <ShoppingCartOutlinedIcon
            fontSize="large"
            style={{ color: "gray" }}
          />
          </Link>
        :
        <span>no items</span>  
        }
        
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
