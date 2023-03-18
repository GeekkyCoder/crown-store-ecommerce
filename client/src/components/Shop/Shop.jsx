import { Fragment, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  fetch_Catogories_fail,
  fetch_catogories_success,
  fetch_catogries_start,
} from "../../store/catogories/catogories.actions";
import {getCatogories} from "../../store/catogories/catogoriesSelector";
import ProductCard from "../ProductCard/ProducutCard";

const Shop = () => {
  const catogoriesData = useSelector(getCatogories);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCatogories = async () => {
       dispatch(fetch_catogries_start());
      try {
        const data = await axios.get("http://localhost:8000/products");
        dispatch(fetch_catogories_success(data.data));
      } catch (err) {
        dispatch(fetch_Catogories_fail(err));
      }
    };
    fetchCatogories();
  }, []);

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
          </Fragment>
        );
      })}
    </div>
  );
};

export default Shop;
