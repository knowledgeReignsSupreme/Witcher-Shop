import React from 'react';
import styled from 'styled-components';
import Carousel from '../Common/Carousel';
import Loader from '../Common/Loader';
import Error from '../Common/Error';

const TopProducts = ({ products, success, isLoading, error }) => {
  return (
    <StyledTopProducts>
      <h2>Top products</h2>
      {isLoading && <Loader size={60} message='Loading top products...' />}
      {success && <Carousel items={products} />}
      {error && (
        <Error message='There was a problem showing the top products' />
      )}
    </StyledTopProducts>
  );
};

const StyledTopProducts = styled.div`
  margin-top: 1rem;
  h2 {
    margin-bottom: 0.3rem;
  }
`;

export default TopProducts;
