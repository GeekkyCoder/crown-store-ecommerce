import { lazy, Suspense } from "react";

// import Navbar from "../../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
// import Shop from "../../components/Shop/Shop";
// import Directory from "../../components/Directory/Directory.jsx";
// import Cart from "../../components/Cart/Cart";
// import Auth from "../../components/Auth/Auth";
// import Signin from "../../components/Signin/Signin";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Shop = lazy(() => import("../../components/Shop/Shop"));
const Directory = lazy(() => import("../../components/Directory/Directory.jsx"));
const Cart = lazy(() => import("../../components/Cart/Cart"));
const Auth = lazy(() => import("../../components/Auth/Auth"));
const Signin = lazy(() => import("../../components/Signin/Signin"));
const Loader = lazy(() => import("../../components/Loader/Loader.jsx"));

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto w-full md:max-w-[90%]">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Directory />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
};

export default Home;
