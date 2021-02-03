import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProduct,
  getRelatedProducts,
} from '../Redux/actions/productActions';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Button from '../Common/Button';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import Stars from '../Common/Stars';
import { FaCartPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Product = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const { currentProduct, isLoading, error, success } = product;

  const related = useSelector((state) => state.related);
  const {
    relatedProducts,
    isLoading: loadingRelatedProducts,
    success: successRelatedProducts,
    error: errorRelatedProducts,
  } = related;

  useEffect(() => {
    if (!success) {
      dispatch(getProduct(productId));
      dispatch(getRelatedProducts(productId));
    }
  }, [dispatch, productId]);

  return (
    <StyledProduct>
      {isLoading && <Loader size={80} />}
      {error && <Error message={error} />}
      {success && !isLoading && (
        <StyledProductInfo>
          <Image>
            <img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.title}
            />
          </Image>
          <Text tier={currentProduct.tier}>
            <h2>{currentProduct.title}</h2>
            <Stars rating={currentProduct.rating} />
            <p>Type: {currentProduct.type}</p>
            <p>
              Tier: <span>{currentProduct.tier}</span>
            </p>
            {currentProduct.type === 'Potion' ? (
              <p>Duration: {currentProduct.duration}</p>
            ) : (
              <p>Weight: {currentProduct.weight}</p>
            )}
            <p>Price: ${currentProduct.price}</p>
            <ul>
              {currentProduct.effects.length > 1 ? 'Effects:' : 'Effect:'}
            </ul>
            {currentProduct.effects.map((effect) => (
              <li key={uuidv4()}>{effect}</li>
            ))}
            <CTAWrapper>
              <select name='quantity' id=''>
                <option value='1'>Select quantity:</option>
                {[...Array(currentProduct.countInStock).keys()].map((num) => (
                  <option key={uuidv4()} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              {currentProduct.countInStock > 0 ? (
                <Button
                  text='Add to cart'
                  icon={<FaCartPlus />}
                  type='red'
                  args={['hey']}
                  handleClick={console.log}
                />
              ) : (
                <Button text='Out of stock' type='red' disabled />
              )}
            </CTAWrapper>
          </Text>
        </StyledProductInfo>
      )}
    </StyledProduct>
  );
};

const StyledProduct = styled(GlobalPageInit)``;

const StyledProductInfo = styled.div`
  display: flex;
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    justify-content: center;
  }
`;

const Image = styled.div`
  max-width: 50%;
  img {
    height: 22rem;
  }

  @media (min-width: 600px) {
    img {
      height: 30rem;
    }
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1rem;

  span {
    font-weight: bold;
    color: ${(props) => props.tier === 'Relic' && 'brown'};
    color: ${(props) => props.tier === 'Master' && 'blue'};
    color: ${(props) => props.tier === 'Magic' && 'orange'};
    color: ${(props) => props.tier === 'Witcher Item' && 'red'};
  }

  ul {
    border-top: 1px solid black;
    padding-top: 0.5rem;
    font-weight: bold;
  }

  li {
    list-style: none;
  }

  li + li {
    margin-top: 0.2rem;
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  justify-content: space-between;
  flex-direction: column;
  select {
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    width: max-content;
    cursor: pointer;
  }
`;
export default Product;
