import Navbar from "../../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "../../components/Shop/Shop";
import Directory from "../../components/Directory/Directory.jsx";
import Cart from "../../components/Cart/Cart";

const Home = () => {
  return (
    <>
      <div className="mx-auto w-full md:max-w-[90%]">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Directory />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Home;
