import React from 'react';
import { useSelector } from 'react-redux';
// import { getProduct, getRelatedProducts } from '../Redux/Products/actions';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import ProductRow from '../Common/ProductRow';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <StyledCart>
      {cartItems.map((item) => (
        <ProductRow product={item} usage='cart' key={uuidv4()} />
      ))}
    </StyledCart>
  );
};

const StyledCart = styled(GlobalPageInit)``;
export default Cart;
