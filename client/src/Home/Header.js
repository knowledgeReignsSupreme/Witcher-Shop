import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slideDown } from '../GlobalStyles';
import Button from '../Common/Button';
import hero from '../images/hero.jpeg';

const Header = () => {
  return (
    <StyledHeader>
      <StyledText>
        <h1>Witcher Shop</h1>
        <h4>Everything you need for the perfect hunt</h4>
        <Link to='/shop/category/all/sort/title/page/1'>
          <Button text='Start Browsing' type='black' link />
        </Link>
      </StyledText>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  min-height: 15rem;
  @media (min-width: 600px) {
    min-height: 25rem;
  }
  &::after {
    content: '';
    background: url(${hero}) no-repeat center center/cover;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    min-height: 15rem;
    box-shadow: 0 7px 2px rgba(0, 0, 0, 0.3);
  }
`;

const StyledText = styled.div`
  position: absolute;
  top: 3rem;
  left: 1rem;
  width: 95%;

  transition: all 0.4s ease-out;
  animation-name: ${slideDown};
  animation-duration: 1s;

  button {
    margin-top: 2rem;
  }
  h4 {
    margin-top: 0.5rem;
  }

  @media (min-width: 600px) {
    h1 {
      font-size: 2.7rem;
    }

    h4 {
      font-size: 1.5rem;
    }

    button {
      padding: 0.9rem 1.8rem;
      font-size: 1.2rem;
      &:hover {
        padding: 0.9rem 2rem;
      }
    }
  }
`;
export default Header;
