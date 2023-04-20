import Slider from "react-slick";
import HomeImage from "../../Assets/home.jpg";
import SHOP_Data from "../../SHOP_DATA";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundColor: "black",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundColor: "black",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  const SETTINGS = {
    dots: true,
    infinite: true,
    speed: 500,
    className: "center",
    slidesToShow: 1,
    centerPadding: "60px",
    autoplay: true,
    cssEase: "linear",
    slidesToScroll: 1,
    adaptiveHeight: true,
    focusOnSelect: true,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:my-20">
      <div
      className="md:my-2"
        style={{
          height: "500px",
          width: "100%",
          backgroundImage: `url(${HomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <h1 className="font-bold font-mono md:font-sans text-xl md:text-4xl my-10  md:my-20 uppercase text-center">
        Have a look at our collections
      </h1>
      <div className="w-[85%] md:w-[70%] mx-auto p-4">
        <Slider {...SETTINGS}>
          {SHOP_Data.map(({ id, name, imageUrl }) => {
            return (
              <div key={id}>
                <img
                  className=" w-[100%] h-[300px] object-cover rounded-sm"
                  width={"100%"}
                  src={imageUrl}
                  alt={name}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
