import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  getCatogories,
  isLoadingSelector,
} from "../../store/catogories/catogoriesSelector";
import ProductCard from "../ProductCard/ProducutCard";
import { ToastContainer } from "react-toastify";


import Loader from "../Loader/Loader";
const Shop = () => {
  const catogoriesData = useSelector(getCatogories);
  const isLoading = useSelector(isLoadingSelector);

  const catogoriesJSX = useMemo(() => {
    return (
      <div>
        {Object.keys(catogoriesData).map((title) => {
          return (
            <Fragment key={title}>
              <div className="text-center uppercase font-bold text-4xl my-20">
                {title}
              </div>
              <div className="grid grid-cols-3 max-w-[95%] mt-10 mx-auto gap-20 place-items-center">
                {catogoriesData[title].slice(0, 6).map((product) => {
                  return <ProductCard key={product.name} product={product} />;
                })}
              </div>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Fragment>
          );
        })}
      </div>
    );
  }, [catogoriesData]);

  return <div>{!isLoading ?  catogoriesJSX  : <Loader />}</div>;
};

export default Shop;
