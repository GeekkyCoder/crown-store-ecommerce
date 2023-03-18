import { Link } from "react-router-dom";

const CatogoryItem = ({ id, title, imageUrl }) => {
  return (
    <>
      <div
        key={id}
        className="w-full my-4 relative hover:scale-[1.05] transition-all"
      >
        {/* <img width={"100%"} src={imageUrl} alt={title} /> */}
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          className=" bg-center bg-cover w-full md:w-11/12  h-[300px] transition-opacity hover:opacity-40 hover:cursor-pointer"
        ></div>
        <div className="absolute bottom-10 left-10 md:left-20 bg-white rounded-sm shadow-md p-4 opacity-70">
          <h2 className="text-gray-600 uppercase text-clip text-center">
            {title}
          </h2>
          <Link
            className="text-gray-600 uppercase block text-center text-2xl font-bold"
            to={"/shop"}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default CatogoryItem;
