import React from 'react';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import { Link } from 'react-router-dom';
import useComponentVisible from '../Helper/useComponentVisible';
import { FiShoppingCart } from 'react-icons/fi';
import { FaBars, FaUser } from 'react-icons/fa';
import logo from '../images/logo.png';
import Dropdown from './Dropdown';

const Nav = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const toggleOnClick = (action) => {
    setIsComponentVisible(action);
  };

  return (
    <div ref={ref}>
      <OutterNav>
        <StyledNav>
          <StyledText onClick={() => toggleOnClick(false)}>
            <Link to='/'>
              <h3>Witcher Shop</h3>
            </Link>
          </StyledText>
          <Logo onClick={() => toggleOnClick(false)}>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
          </Logo>
          <SecondaryNav>
            <FiShoppingCart />
            <FaUser />
            <FaBars onClick={() => toggleOnClick((prevOpen) => !prevOpen)} />
          </SecondaryNav>
        </StyledNav>
      </OutterNav>
      {isComponentVisible && (
        <Dropdown
          setIsComponentVisible={setIsComponentVisible}
          toggleOnClick={toggleOnClick}
        />
      )}
    </div>
  );
};

const OutterNav = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 3rem;
  z-index: 3;

  background: ${colorsVariables.colorSecDark};

  @media (min-width: 600px) {
    height: 4rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 1500px;
  max-width: 93%;

  color: ${colorsVariables.colorWhite};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 3rem;
  }

  @media (min-width: 600px) {
    img {
      width: 4rem;
    }
  }
`;

const StyledText = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  h3 {
    letter-spacing: 1px;
    color: ${colorsVariables.colorMainLight};
    font-size: 0.9rem;
  }

  @media (min-width: 600px) {
    h3 {
      font-size: 1.4rem;
    }
  }
`;

const SecondaryNav = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  svg {
    cursor: pointer;
    font-size: 1.3rem;
    color: ${colorsVariables.colorWhite};
    @media (min-width: 600px) {
      font-size: 2rem;
    }
  }
  svg + svg {
    margin-left: 1rem;
    @media (min-width: 600px) {
      margin-left: 1.5rem;
    }
  }

  svg:last-of-type {
    color: ${colorsVariables.colorMainDark};
  }
`;

export default Nav;
