import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../Assets/crown.svg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center p-5 mt-5 font-sans uppercase font-bold bg-white shadow-lg">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>

        <div className="ml-auto flex gap-10 items-center">
          <Link className="text-gray-500 hover:text-black" to={"/shop"}>
            Shop
          </Link>
          <Link className="text-gray-500 hover:text-black">Sign in</Link>
          <ShoppingCartOutlinedIcon
            fontSize="large"
            style={{ color: "gray" }}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
