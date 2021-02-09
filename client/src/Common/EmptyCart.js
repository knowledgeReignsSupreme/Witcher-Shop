import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Common/Button';

const EmptyCart = () => {
  return (
    <StyledEmptyCart>
      <h1>Cart is empty</h1>
      <Link to='/shop/category/all/sort/title/page/1'>
        <Button color='red' link text='Shop items' />
      </Link>
    </StyledEmptyCart>
  );
};

const StyledEmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 30vh;
`;

export default EmptyCart;
