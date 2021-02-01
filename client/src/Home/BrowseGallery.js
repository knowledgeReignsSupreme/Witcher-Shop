import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import silverSword from '../images/silver-sword.jpg';
import steelSword from '../images/steel-sword.jpg';
import armor from '../images/armor.jpg';
import potions from '../images/potions.png';

const BrowseGallery = () => {
  return (
    <StyledBrowse>
      <Heading>
        <h2>Browse</h2>
        <a href='/shop'>Browse all &rarr;</a>
      </Heading>
      <Categories>
        <Category>
          <Link to='/shop/silver-swords'>
            <img src={silverSword} alt='silver sword' />
            <p>Silver swords</p>
          </Link>
        </Category>
        <Category>
          <Link to='/shop/steel-swords'>
            <img src={steelSword} alt='steel sword' />
            <p>Steel swords</p>
          </Link>
        </Category>
        <Category>
          <Link to='/shop/armors'>
            <img src={armor} alt='armor' />
            <p>Armors</p>
          </Link>
        </Category>
        <Category>
          <Link to='/shop/potions'>
            <img src={potions} alt='potions' />
            <p>Potions</p>
          </Link>
        </Category>
      </Categories>
    </StyledBrowse>
  );
};

const StyledBrowse = styled.div`
  margin-top: 2rem;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;

  a {
    color: ${colorsVariables.colorLink};
    cursor: pointer;
  }

  p {
    font-weight: bold;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Category = styled.div`
  position: relative;
  margin-bottom: 1rem;
  cursor: pointer;

  p {
    position: absolute;
    font-weight: bold;
    font-size: 1.6rem;
    left: 0.5rem;
    top: 80%;
    color: ${colorsVariables.colorWhite};
    background: ${colorsVariables.colorMainDark};
    border: 1px solid ${colorsVariables.colorMainDark};
    padding: 0.2rem 0.4rem;
  }

  img {
    width: 100%;
    opacity: 0.6;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    img {
      opacity: 1;
    }
  }

  @media (min-width: 800px) {
    width: 100%;
    margin-right: 1rem;
  }

  @media (min-width: 800px) and (max-width: 1100px) {
    p {
      font-size: 1.3rem;
      left: 0.2rem;
      top: 75%;
    }
  }
`;

export default BrowseGallery;
