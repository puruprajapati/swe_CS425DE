import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import DefaultImage from "../../assets/img/default-house.jpeg";

const Carousel = ({ list }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
  };

  let items = [];
  console.log(list.length);
  if (list.length === 1) {
    items.push(
      <div className="carousel-item">
        <img src={list[0].imageUrl} className="carousel-img" alt="house" />
      </div>
    );
    items.push(
      <div className="carousel-item">
        <img src={list[0].imageUrl} className="carousel-img" alt="house" />
      </div>
    );
  } else {
    list.map((item) => {
      items.push(
        <div className="carousel-item">
          <img src={item.imageUrl} className="carousel-img" alt="house" />
        </div>
      );
    });
  }
  let defaultList = [];
  defaultList.push(
    <div className="carousel-item">
      <img src={DefaultImage} className="carousel-img" alt="house" />
    </div>
  );
  defaultList.push(
    <div className="carousel-item">
      <img src={DefaultImage} className="carousel-img" alt="house" />
    </div>
  );
  return (
    <>
      <Slider {...settings}>{list.length > 0 ? items : defaultList}</Slider>
    </>
  );
};

export default Carousel;
