import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';

const Stars = ({ rating }) => {
  return (
    <StyledStars>
      {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalfAlt /> : ''}
      {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalfAlt /> : ''}
      {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalfAlt /> : ''}
      {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalfAlt /> : ''}
      {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalfAlt /> : ''}
    </StyledStars>
  );
};

const StyledStars = styled.div`
  svg {
    background: ${colorsVariables.mainColorDark} !important;
  }
`;
export default Stars;
