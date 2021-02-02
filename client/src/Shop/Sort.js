import React from 'react';
import styled from 'styled-components';

const Sort = ({ sortHandler }) => {
  return (
    <StyledSort>
      <select name='sort' onChange={sortHandler} value={'Sort by'}>
        <option defaultValue disabled value='Sort by'>
          Sort by
        </option>
        <option value='title'>Sort by A-Z (default)</option>
        <option value='-price'>Price: Highest first</option>
        <option value='price'>Price: Lowest first</option>
        <option value='-rating'>Rating: Highest first</option>
        <option value='rating'>Rating: Lowest first</option>
      </select>
    </StyledSort>
  );
};

const StyledSort = styled.div`
  width: max-content;
  margin: 0 auto;
  option {
    cursor: pointer;
  }
`;

export default Sort;
