import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCatogories } from "../../store/catogories/catogoriesSelector";
import ProductCard from "../ProductCard/ProducutCard";

const Shop = () => {
  const catogoriesData = useSelector(getCatogories);

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
