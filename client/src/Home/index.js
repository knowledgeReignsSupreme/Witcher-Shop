import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopProducts } from '../Redux/Products/actions';
import Helmet from 'react-helmet';
import { GlobalPageInit } from '../GlobalStyles';
import styled from 'styled-components';
import Header from './Header';
import TopProducts from './TopProducts';
import BrowseGallery from './BrowseGallery';

const Home = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { products, success, isLoading, error } = topProducts;

  useEffect(() => {
    if (!success) {
      dispatch(getTopProducts());
    }
  }, [dispatch, success]);

  return (
    <StyledHome>
      <Helmet>
        <title>Witcher Shop | Home</title>
        <meta
          name='description'
          content='Withcer shop home page. Here you can navigate and view top products'
        />
      </Helmet>
      <Header />
      <TopProducts
        products={products?.data}
        isLoading={isLoading}
        success={success}
        error={error}
      />
      <BrowseGallery />
    </StyledHome>
  );
};

const StyledHome = styled(GlobalPageInit)``;
export default Home;
