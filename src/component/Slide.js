import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = (props) => {
    const slideSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  
    return (
      <Slider {...slideSettings}>
        <div>
          <img src={props.img} alt="Image 1" height="400px" width="400px" />
        </div>
        <div>
          <img src={props.img} alt="Image 2" height="400px" width="400px" />
        </div>
        <div>
          <img src={props.img} alt="Image 3" height="400px" width="400px" />
        </div>
      </Slider>
    );
  };
  
  export default Slide;