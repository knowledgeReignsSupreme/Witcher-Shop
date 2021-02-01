import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import ProductCard from './ProductCard';

const Carousel = ({ items }) => {
  const renderSlides = () =>
    items.map((product) => (
      <StyledSlide key={product._id}>
        <ProductCard product={product} />
      </StyledSlide>
    ));
  return (
    <SS>
      <Slider
        dots={true}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={false}
        autoplaySpeed={2000}
        speed={1000}
      >
        {renderSlides()}
      </Slider>
    </SS>
  );
};

const SS = styled.div`
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.2);

  background: ${colorsVariables.colorSecDark};
  color: ${colorsVariables.colorWhite};

  ul {
    position: static;
    padding-bottom: 1rem;
  }

  li button::before {
    opacity: 1;
    font-size: 1rem;
    color: red;
  }

  .slick-dots li.slick-active button::before {
    color: ${colorsVariables.colorWhite};
    opacity: 1;
  }
`;

const StyledSlide = styled.div`
  text-align: center;
`;
export default Carousel;
