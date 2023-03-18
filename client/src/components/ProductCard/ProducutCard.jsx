const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  return (
    <>
      <div className="flex-1 relative w-full shadow-lg hover:scale-[1.1] transition-transform">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            width: "100%",
            height: "300px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>{" "}
        <div className="absolute top-[40%] bottom-[40%] left-[30%] my-auto mx-auto">
          <button className="bg-white shadow-lg opacity-[.5] rounded-md uppercase font-bold font-sans p-4 hover:opacity-[.7]">
            add to cart
          </button>
        </div>
        <div className="flex justify-evenly items-center uppercase font-mono text-xl font-medium  my-2">
          <p>{name}</p>
          <p>
            {price}{" "}
            <span className="uppercase text-green-500 font-bold">pkr</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
