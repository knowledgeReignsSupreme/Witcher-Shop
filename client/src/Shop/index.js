import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/actions/productActions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import ProductCard from '../Common/ProductCard';
import Pagination from '../Common/Pagination';
import Sort from './Sort';
import Search from './Search';

const Shop = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const category = match.params.category;
  const pageNumber = match.params.pageNumber;
  const sort = match.params.sortMethod;
  const keyword = match.params.keyword;

  const [searchKeyword, setSearchKeyword] = useState('');

  const productsData = useSelector((state) => state.products);
  const { success, error, isLoading, products } = productsData;

  useEffect(() => {
    dispatch(getProducts(pageNumber, category, sort, keyword));
  }, [dispatch, category, pageNumber, sort, keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const sortHandler = (e) => {
    return (
      history.push(
        `/shop/${category}/${e.target.value}/${keyword}/${pageNumber}`
      ),
      [e.target.value]
    );
  };

  const searchHandler = (searchKeyword) => {
    return (
      history.push(`/shop/${category}/${sort}/${searchKeyword}/${pageNumber}`),
      [searchKeyword]
    );
  };

  return (
    <>
      {isLoading && <Loader size={80} />}
      {error && (
        <Error message='There was a problem accessing these products' />
      )}
      {success && !isLoading && (
        <>
          <Sort sortHandler={sortHandler} />
          <Search
            setSearchKeyword={setSearchKeyword}
            searchHandler={searchHandler}
            searchKeyword={searchKeyword}
          />
          <StyledShop>
            {products.data.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </StyledShop>
          <Pagination
            pages={products?.pagination?.totalPages}
            category={category || 'all'}
            sort={sort}
            keyword={keyword}
          />
        </>
      )}
    </>
  );
};

const StyledShop = styled(GlobalPageInit)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;

  div {
    width: 100%;
  }
`;

export default Shop;
