import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/User/actions';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colorsVariables, slideDown } from '../GlobalStyles';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const Dropdown = ({ toggleOnClick }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const signOutHandler = () => {
    dispatch(logout());
  };

  return (
    <OutterDropdown>
      <StyledDropdown>
        <MainNav onClick={() => toggleOnClick(false)}>
          <NavLink to='/shop/all/title/1' exact>
            <p>All products</p>
          </NavLink>

          <NavLink to='/shop/category/silver-swords/sort/title/page/1'>
            <p>Silver swords</p>
          </NavLink>

          <NavLink to='/shop/category/steel-swords/sort/title/page/1'>
            <p>Steel swords</p>
          </NavLink>

          <NavLink to='/shop/category/armors/sort/title/page/1'>
            <p>Armors</p>
          </NavLink>

          <NavLink to='/shop/category/postions/sort/title/page/1'>
            <p>Potions</p>
          </NavLink>
        </MainNav>

        {loggedUser ? (
          <SecNav onClick={() => toggleOnClick(false)}>
            <NavLink to='/profile'>
              <p>
                <FaUser /> Profile
              </p>
            </NavLink>
            <p onClick={signOutHandler}>
              <FaSignOutAlt /> Sign out
            </p>
          </SecNav>
        ) : (
          <SecNav onClick={() => toggleOnClick(false)}>
            <NavLink to='/register'>
              <p>Sign up</p>
            </NavLink>

            <NavLink to='/login'>
              <p>Sign in</p>
            </NavLink>
          </SecNav>
        )}
      </StyledDropdown>
    </OutterDropdown>
  );
};

const OutterDropdown = styled.div`
  width: 100%;
  background: ${colorsVariables.colorSecDark};
  z-index: 0;
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
    text-transform: uppercase;
    cursor: pointer;
  }

  p:hover {
    color: ${colorsVariables.colorMainDark};
  }
`;

const MainNav = styled.div`
  margin-bottom: 1.5rem;
`;
const SecNav = styled.div``;

export default Dropdown;
