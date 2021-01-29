import React from 'react';
import styled from 'styled-components';
import { colorsVariables, slideDown } from '../GlobalStyles';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ setIsComponentVisible, toggleOnClick }) => {
  return (
    <OutterDropdown>
      <StyledDropdown>
        <MainNav onClick={toggleOnClick}>
          <NavLink to='/shop' exact>
            <p>All products</p>
          </NavLink>

          <NavLink to='/shop/silver-swords'>
            <p>Silver swords</p>
          </NavLink>

          <NavLink to='/shop/steel-swords'>
            <p>Steel swords</p>
          </NavLink>

          <NavLink to='/shop/armors'>
            <p>Armors</p>
          </NavLink>

          <NavLink to='/shop/potions'>
            <p>Potions</p>
          </NavLink>
        </MainNav>

        <SecNav onClick={toggleOnClick}>
          <NavLink to='/shop/register'>
            <p>Sign up</p>
          </NavLink>

          <NavLink to='/shop/login'>
            <p>Sign in</p>
          </NavLink>
          {/* //TODO Change to Profile and Log Out when implementing user logic */}
        </SecNav>
      </StyledDropdown>
    </OutterDropdown>
  );
};

const OutterDropdown = styled.div`
  width: 100%;
  background: ${colorsVariables.colorSecDark};
`;

const StyledDropdown = styled.div`
  width: 1500px;
  max-width: 96.5%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-top: -0.25rem;

  background: ${colorsVariables.colorSecDark};
  color: ${colorsVariables.colorWhite};

  transition: all 0.5s ease-out;
  animation-name: ${slideDown};
  animation-duration: 1s;
  p {
    font-weight: bold;
    margin-top: 1rem;
    margin-left: 0.5rem;
    font-size: 1.1rem;
  }

  a:hover {
    color: ${colorsVariables.colorMainDark};
  }
`;

const MainNav = styled.div`
  margin-bottom: 1.5rem;
`;
const SecNav = styled.div``;

export default Dropdown;
