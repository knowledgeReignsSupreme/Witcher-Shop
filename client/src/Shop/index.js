import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/actions/productActions';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import ProductCard from '../Common/ProductCard';

const Shop = ({ match }) => {
  const category = match.params.category;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const { success, error, isLoading, products } = productsData;

  useEffect(() => {
    dispatch(getProducts(pageNumber, category));
  }, [dispatch, category, pageNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <Loader size={80} />}
      {error && (
        <Error message='There was a problem accessing these products' />
      )}
      <StyledShop>
        {success &&
          !isLoading &&
          products.data.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </StyledShop>
    </>
  );
};

const StyledShop = styled(GlobalPageInit)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  grid-column-gap: 1rem;
  grid-row-gap: 3rem;

  div {
    width: 100%;
  }
`;

export default Shop;
