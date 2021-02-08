import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../Redux/Cart/actions';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import ProductRow from '../Common/ProductRow';
import Button from '../Common/Button';

const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const quantityChangeHandler = (e, id) => {
    dispatch(addToCart(id, e.target.value));
  };

  const calculateTotalPrice = useCallback(() => {
    const newPrice = cartItems.reduce((a, b) => +a + b.price * +b.quantity, 0);
    setTotalPrice(newPrice);
  }, [cartItems]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice, cartItems]);

  return (
    <StyledCart>
      {cartItems <= 0 ? (
        <StyledEmptyCrt>
          <h1 style={{ textAlign: 'center' }}>Cart is empty</h1>
          <Link to='/shop/category/all/sort/title/page/1'>
            <Button color='red' link text='Shop items' />
          </Link>
        </StyledEmptyCrt>
      ) : (
        <>
          <StyledCartActions>
            <Link to='/shop/category/all/sort/title/page/1'>
              <Button color='red' link text='Shop more' />
            </Link>

            <Link to='/checkout'>
              <Button color='black' link text='Checkout &rarr;' />
            </Link>
          </StyledCartActions>
          <Sum>Total price: {totalPrice}</Sum>
          {cartItems.map((item) => (
            <ProductRow
              product={item}
              usage='cart'
              removeHandler={removeFromCartHandler}
              quantityChangeHandler={quantityChangeHandler}
              key={uuidv4()}
            />
          ))}
        </>
      )}
    </StyledCart>
  );
};

const StyledCart = styled(GlobalPageInit)`
  select {
    margin-bottom: 0.4rem;
  }
`;

const Sum = styled.h3`
  padding: 1rem 0 0 0;
  width: 100%;
  max-width: 35rem;
  margin: 0 auto;
`;

const StyledCartActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 35rem;

  border-bottom: 1px solid black;
  padding: 1rem 0;
  padding-bottom: 0.5rem;
`;

const StyledEmptyCrt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 30vh;
`;
export default Cart;
