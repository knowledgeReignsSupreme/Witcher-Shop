import React from 'react';
import styled from 'styled-components';

const Search = ({ searchHandler, setSearchKeyword, searchKeyword }) => {
  return (
    <StyledSearch>
      <input type='text' onChange={(e) => setSearchKeyword(e.target.value)} />
      <button onClick={() => searchHandler(searchKeyword)}>Search</button>
      <button onClick={() => searchHandler('nokeyword')}>Reset search</button>
    </StyledSearch>
  );
};

const StyledSearch = styled.div``;
export default Search;
