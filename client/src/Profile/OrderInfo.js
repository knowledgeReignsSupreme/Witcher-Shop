import React from 'react';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';

const OrderInfo = ({ order }) => {
  const formatDate = (date) => {
    const monthOnly = date.slice(0, 10);
    return monthOnly.split('-').reverse().join().replaceAll(',', '/');
  };

  return (
    <StyledOrderInfo>
      <p>Order no. {order._id}</p>
      <p>Total Price: {order.totalPrice}</p>
      <p>Created at: {formatDate(order.createdAt)}</p>
    </StyledOrderInfo>
  );
};

const StyledOrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  box-shadow: ${cssVariables.boxShadow};
  padding: 1rem;
  margin-top: 1rem;

  p + p {
    margin-top: 0.5rem;
  }
`;

export default OrderInfo;
