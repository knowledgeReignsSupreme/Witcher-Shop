import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colorsVariables } from '../GlobalStyles';
import Button from './Button';
import Stars from './Stars';
import { FaCartPlus, FaCoins } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product.slug}/${product._id}`}>
        <StyledCard>
          <Content>
            <Header>
              <img src={`/images/${product.image}`} alt='' />
            </Header>
            <Text>
              <h3>{product.title} </h3>
              <Stars rating={product.rating} />
              <p>
                {product.price} <FaCoins />
              </p>
              <Button
                text='Add to cart'
                type='red'
                icon={<FaCartPlus />}
                link
              />
            </Text>
          </Content>
        </StyledCard>
      </Link>
    </>
  );
};

const StyledCard = styled.div`
  max-width: 18rem;
  display: flex;
  margin: 0 auto;
  padding: 0 0.5rem 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 9rem;
  margin-top: 0.3rem;

  button {
    cursor: pointer;
    color: ${colorsVariables.colorWhite};
  }
`;

const Header = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  text-align: center;
`;

export default ProductCard;
