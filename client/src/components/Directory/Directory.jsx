import CatogoryItem from "../CatogoryItems/CatogoryItem";
import SHOP_DATA from "../../SHOP_DATA";

function Directory() {
  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 p-5 mt-10 gap-5 place-items-center justify-center shadow-sm" >
        {SHOP_DATA.map(({id,title,imageUrl}) => {
              return <CatogoryItem id={id} title={title} imageUrl={imageUrl} />;
            })}
      </div>
    </>
  );
}

export default Directory;
