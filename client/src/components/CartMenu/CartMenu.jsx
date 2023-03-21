const CartMenu = (props) => {
  const { name, imageUrl, quantity, price } = props.item;

  return (
    <>
      <div className="flex justify-between items-center p-4 font-mono font-bold text-xl">
        <div className="w-[30%] ">
          <img className="w-full rounded-sm scale-[1] hover:scale-[1.1] ease-in duration-500 cursor-pointer" src={imageUrl} alt={name} />
          <p className="text-center">{name}</p>
        </div>
        <div className="w-[25%] ml-4 ">x-{quantity}</div>
        <div className="w-[25%] ml-4">
          {price}
          <span className="ml-2">pkr</span>
        </div>
      </div>
    </>
  );
};

export default CartMenu;
