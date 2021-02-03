import React from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { FaSearch } from 'react-icons/fa';

const Search = ({
  searchHandler,
  resetKeyword,
  setSearchKeyword,
  searchKeyword,
}) => {
  return (
    <StyledSearch>
      <Input
        type='text'
        placeholder='Keyword'
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <StyledButtons>
        <Button
          handleClick={searchHandler}
          type='red'
          text='Search'
          args={[searchKeyword]}
          icon={<FaSearch />}
        ></Button>
        <Button
          handleClick={resetKeyword}
          args={''}
          type='black'
          text='Reset search'
        >
          Reset search
        </Button>
      </StyledButtons>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

export default Search;
