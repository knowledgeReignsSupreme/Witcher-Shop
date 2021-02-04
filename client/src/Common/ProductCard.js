import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colorsVariables } from '../GlobalStyles';
import Button from './Button';
import Stars from './Stars';
import AddToCartButton from './addToCartButton';
import { FaCartPlus, FaCoins } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <>
      <StyledCard>
        <Content>
          <Link to={`/product/${product.slug}/${product._id}`}>
            <Header>
              <img src={`/images/${product.image}`} alt='' />
            </Header>
          </Link>
          <Text>
            <Link to={`/product/${product.slug}/${product._id}`}>
              <h3>{product.title} </h3>
              <Stars rating={product.rating} />
            </Link>
            <p>
              {product.price} <FaCoins />
            </p>
            {product.countInStock > 0 ? (
              <AddToCartButton currentProduct={product} quantity={1} />
            ) : (
              <Button
                text='Out of stock'
                type='red'
                icon={<FaCartPlus />}
                disabled
              />
            )}
          </Text>
        </Content>
      </StyledCard>
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

  min-height: 8rem;
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
