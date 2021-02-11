import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, getRelatedProducts } from '../Redux/Products/actions';
import { v4 as uuidv4 } from 'uuid';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Button from '../Common/Button';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import Stars from '../Common/Stars';
import Carousel from '../Common/Carousel';
import AddToCartButton from '../Common/addToCartButton';

const Product = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) => state.product);
  const { currentProduct, isLoading, error, success } = product;

  const related = useSelector((state) => state.related);
  const {
    relatedProducts,
    isLoading: loadingRelatedProducts,
    error: errorRelatedProducts,
  } = related;

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getRelatedProducts(productId));
  }, [dispatch, productId]);

  const quantityHandler = (e) => {
    setQuantity((prevQuantity) => e.target.value);
  };

  return (
    <StyledProduct>
      {currentProduct && (
        <Helmet>
          <title>Witcher Shop | {currentProduct.title}</title>
          <meta
            name='description'
            content={`${currentProduct.title} is a ${currentProduct.category}`}
          />
        </Helmet>
      )}
      {isLoading && <Loader size={80} message='Loading product...' />}
      {error && <Error message={error} />}
      {success && !isLoading && !error && (
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
              <select
                name='quantity'
                onChange={quantityHandler}
                value={quantity}
              >
                <option value='novalue' disabled>
                  Select quantity:
                </option>
                {currentProduct.countInStock <= 0 && (
                  <option value='novalue'>Out of stock</option>
                )}
                {[...Array(currentProduct.countInStock).keys()].map((num) => (
                  <option key={uuidv4()} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              {currentProduct.countInStock > 0 ? (
                <AddToCartButton
                  currentProduct={currentProduct}
                  quantity={quantity || 1}
                />
              ) : (
                <Button text='Out of stock' color='red' disabled />
              )}
            </CTAWrapper>
          </Text>
        </StyledProductInfo>
      )}
      {errorRelatedProducts ? (
        <Error message={errorRelatedProducts} />
      ) : loadingRelatedProducts ? (
        <>
          <Loader size={80} message='Loading related prdocuts...' />
        </>
      ) : (
        relatedProducts &&
        !loadingRelatedProducts && (
          <>
            <h2 style={{ textAlign: 'center' }}>Related products:</h2>
            <Carousel items={relatedProducts} />
          </>
        )
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
  margin-bottom: 1rem;
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
      width: 45rem;
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
  justify-content: space-between;
  flex-direction: column;
  margin-top: 0.5rem;

  select {
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    width: max-content;
    cursor: pointer;
  }
`;
export default Product;
