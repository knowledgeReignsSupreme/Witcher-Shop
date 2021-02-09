import React from 'react';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../Redux/Cart/actions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import { FaCcStripe, FaPaypal } from 'react-icons/fa';
import Button from '../Common/Button';
import OrderStages from '../Common/OrderStages';

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const paymentMethodHandler = (method) => {
    dispatch(savePaymentMethod(method));
    history.push('/order');
  };

  return (
    <>
      <OrderStages currentStage={3} />
      <StyledPayment>
        <h3>Choose a payment method:</h3>
        <Button
          link
          text='Pay with PayPal'
          color='red'
          icon={<FaPaypal />}
          handleClick={paymentMethodHandler}
          args={['PayPal']}
        />
        <Button
          link
          text='Pay with Stripe'
          color='black'
          icon={<FaCcStripe />}
          handleClick={paymentMethodHandler}
          args={['Stripe']}
        />
      </StyledPayment>
    </>
  );
};

const StyledPayment = styled(GlobalPageInit)`
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    margin-bottom: 1rem;
  }
  button {
    margin-bottom: 1rem;
  }
`;
export default Payment;
