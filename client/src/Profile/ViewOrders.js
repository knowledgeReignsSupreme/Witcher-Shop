import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import OrderInfo from './OrderInfo';
import { FaBoxOpen, FaPlane, FaMoneyCheckAlt } from 'react-icons/fa';

const ViewOrders = ({ orders, setCurrentViewedOrder, currentViewedOrder }) => {
  return (
    <StyledViewOrders>
      <h3>View orders:</h3>
      <Orders>
        <OrderType
          onClick={() => setCurrentViewedOrder(orders?.awaitingPaymentOrders)}
        >
          <FaMoneyCheckAlt />
          <p>To be paid</p>
        </OrderType>
        <OrderType
          onClick={() => setCurrentViewedOrder(orders?.awaitingDeliveryOrders)}
        >
          <FaBoxOpen />
          <p>To be shipped</p>
        </OrderType>
        <OrderType
          onClick={() => setCurrentViewedOrder(orders?.deliveredOrders)}
        >
          <FaPlane />
          <p>Shipped</p>
        </OrderType>
      </Orders>
      {currentViewedOrder === '' ? (
        <p
          style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}
        >
          Click on category to watch orders
        </p>
      ) : currentViewedOrder.length === 0 ? (
        <p
          style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}
        >
          No related orders
        </p>
      ) : (
        currentViewedOrder.map((order) => (
          <Link to={`/order/${order._id}`} key={order._id}>
            <OrderInfo order={order} />
          </Link>
        ))
      )}
    </StyledViewOrders>
  );
};

const StyledViewOrders = styled.div`
  margin-top: 2rem;
  width: 100%;
  h3 {
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid black;
    padding-bottom: 0.3rem;
  }
`;

const Orders = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const OrderType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  cursor: pointer;
  p {
    font-weight: bold;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  svg {
    margin: 0 0 0.3rem 0;
    font-size: 1.5rem;
    color: ${colorsVariables.colorMainDark};
  }

  @media (min-width: 600px) {
    svg {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export default ViewOrders;
