import React from 'react';
import styled from 'styled-components';

const OrderStages = ({ currentStage }) => {
  return (
    <StyledStages>
      <StyledStage>
        {currentStage === 1 ? (
          <p style={{ opacity: 1, color: 'black', transform: 'scale(1.1)' }}>
            Sign In
          </p>
        ) : (
          <p>Sign In</p>
        )}
      </StyledStage>
      <StyledStage>
        {currentStage === 2 ? (
          <p style={{ opacity: 1, color: 'black', transform: 'scale(1.1)' }}>
            Shipping
          </p>
        ) : (
          <p>Shipping</p>
        )}
      </StyledStage>
      <StyledStage>
        {currentStage === 3 ? (
          <p style={{ opacity: 1, color: 'black', transform: 'scale(1.1)' }}>
            Payment
          </p>
        ) : (
          <p>Payment</p>
        )}
      </StyledStage>
      <StyledStage>
        {currentStage === 4 ? (
          <p style={{ opacity: 1, color: 'black', transform: 'scale(1.1)' }}>
            Order
          </p>
        ) : (
          <p>Order</p>
        )}
      </StyledStage>
    </StyledStages>
  );
};

const StyledStages = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 1rem 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid black;
`;
const StyledStage = styled.div`
  p {
    font-weight: bold;
    opacity: 0.5;
  }
`;

export default OrderStages;
