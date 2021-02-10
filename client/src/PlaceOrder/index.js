import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../Redux/Orders/actions';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import ProductRow from '../Common/ProductRow';
import Button from '../Common/Button';
import OrderStages from '../Common/OrderStages';
import EmptyCart from '../Common/EmptyCart';

const PlaceOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, isLoading, order: createdOrder } = orderCreate;

  const shippingPrice = cart?.shippingTotal || 0;

  const totalPrice = cartItems.reduce((a, b) => +a + b.price * +b.quantity, 0);

  const order = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    totalPrice,
  };

  const placeOrderHandler = () => {
    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${createdOrder._id}`);
      dispatch({ type: 'ORDER_CREATE_RESET' });
    }
  }, [success, createdOrder?._id, history, dispatch]);

  useEffect(() => {
    if (loggedUser === null) {
      history.push('/login/redirect=shipping');
    }
  });

  return (
    <>
      {cartItems.length <= 0 ? (
        <EmptyCart />
      ) : (
        <StyledOrder>
          <OrderStages currentStage={4} />
          <StyledOrderOverview>
            <Details>
              <h3>Shipping:</h3>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>

              <h3>Payment Method:</h3>
              <p>Method: {cart.paymentMethod}</p>

              <h3>Items:</h3>
              {cartItems.map((item) => (
                <ProductRow product={item} usage='order' key={uuidv4()} />
              ))}
            </Details>
            <Summary>
              <h3>Order Summary:</h3>
              <p>Price: ${totalPrice}</p>
              <p>Shipping: Free</p>
              <p>Total price: ${totalPrice + shippingPrice}</p>
              {isLoading ? (
                <Button text='Placing order...' color='black' disabled />
              ) : (
                <Button
                  text='Place order'
                  color='black'
                  handleClick={placeOrderHandler}
                  args={['']}
                />
              )}
            </Summary>
          </StyledOrderOverview>
        </StyledOrder>
      )}
    </>
  );
};

const StyledOrder = styled(GlobalPageInit)`
  margin-top: 1rem;
`;

const StyledOrderOverview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Details = styled.div`
  h3 {
    margin-top: 1rem;
  }

  @media (min-width: 1000px) {
  }
`;

const Summary = styled.div`
  max-width: 35rem;
  padding: 1rem 4rem 1rem 1rem;
  margin-top: 1rem;
  border: 1px solid black;

  p,
  button {
    margin-top: 1rem;
  }

  @media (min-width: 1000px) {
    width: 30%;
    height: max-content;
  }
`;
export default PlaceOrder;
