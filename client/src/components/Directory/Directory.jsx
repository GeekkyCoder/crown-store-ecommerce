import CatogoryItem from "../CatogoryItems/CatogoryItem";
import SHOP_DATA from "../../SHOP_DATA";

function Directory() {
  return (
    <>
      <div className="grid md:grid-rows-3 grid-rows-6 grid-cols-1 md:grid-cols-3 p-5 mt-10 gap-5 md:place-items-center justify-center shadow-sm" >
        {SHOP_DATA.map(({id,title,imageUrl}) => {
              return <CatogoryItem key={id} id={id} title={title} imageUrl={imageUrl} />;
            })}
      </div>
    </>
  );
}

export default Directory;
