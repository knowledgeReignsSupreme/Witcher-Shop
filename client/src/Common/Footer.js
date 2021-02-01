import React from 'react';
import logo from '../images/logo.png';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <OutterFooter>
      <StyledFooter>
        {' '}
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </StyledFooter>
    </OutterFooter>
  );
};

const OutterFooter = styled.footer`
  width: 100%;
  height: 4rem;
  z-index: 3;
  background: ${colorsVariables.colorSecDark};
`;

const StyledFooter = styled.div`
  width: 1500px;
  max-width: 93%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  img {
    width: 4rem;
    margin: 0 auto;
  }
`;

export default Footer;
