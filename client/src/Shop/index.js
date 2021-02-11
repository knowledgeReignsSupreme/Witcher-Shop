import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/Products/actions';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { GlobalPageInit, colorsVariables } from '../GlobalStyles';
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
    //In Sort, the option in 'select' is the value
    return keyword
      ? history.push(
          `/shop/category/${category}/sort/${e.target.value}/search/${keyword}/page/1`
        )
      : history.push(
          `/shop/category/${category}/sort/${e.target.value}/page/1`
        );
  };

  const searchHandler = (searchKeyword) => {
    if (searchKeyword.trim()) {
      return history.push(
        `/shop/category/${category}/sort/${sort}/search/${searchKeyword}/page/1`
      );
    }
  };

  const resetKeyword = () => {
    history.push(`/shop/category/${category}/sort/${sort}/page/${pageNumber}`);
  };

  return (
    <>
      <Helmet>
        <title>Witcher Shop | Shop</title>
        <meta
          name='description'
          content='Browse endless witcher products in order to bring the best witcher out of you in the hunt'
        />
      </Helmet>
      {isLoading && <Loader size={80} />}
      {error && <Error message={error} />}
      {success && !isLoading && (
        <>
          <StyledResultsHandlers>
            <Sort sortHandler={sortHandler} />
            <Search
              setSearchKeyword={setSearchKeyword}
              searchKeyword={searchKeyword}
              searchHandler={searchHandler}
              resetKeyword={resetKeyword}
            />
            {keyword && (
              <p>
                Search keyword: <span>{keyword}</span>
              </p>
            )}
          </StyledResultsHandlers>
          <StyledShop>
            {products.data.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </StyledShop>
          <Pagination
            pages={products?.pagination?.totalPages}
            category={category}
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

const StyledResultsHandlers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1rem auto;

  p {
    font-weight: bold;
    margin-top: 0.5rem;

    span {
      color: ${colorsVariables.colorMainDark};
    }
  }
`;

export default Shop;
