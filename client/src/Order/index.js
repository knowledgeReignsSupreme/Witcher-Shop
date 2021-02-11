import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder, payOrder } from '../Redux/Orders/actions';
import { clearCart } from '../Redux/Cart/actions';
import { ORDER_PAY_RESET } from '../Redux/Orders/constants';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import StripeCheckout from 'react-stripe-checkout';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GlobalPageInit, colorsVariables } from '../GlobalStyles';
import ProductRow from '../Common/ProductRow';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

const Order = ({ match }) => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const orderId = match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isWatchingItems, setIsWatchingItems] = useState(false);

  const order = useSelector((state) => state.order);
  const { currentOrder, isLoading, success, error } = order;

  const orderPay = useSelector((state) => state.orderPay);
  const { isLoading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const payPalSuccessHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    dispatch(clearCart());
  };

  const stripeSuccessHandler = () => {
    dispatch(payOrder(orderId));
    dispatch(clearCart());
  };

  useEffect(() => {
    if (loggedUser === null) {
      history.push(`/login/redirect=cart`);
    }
  }, [loggedUser, history]);

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      if (error === 'You are not allowed to view this order.') {
        history.push(`/cart`);
      }
    }
  }, [loggedUser, success, history, currentOrder?.user, error]);

  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrder(orderId));
    }
  }, [dispatch, currentOrder, successPay, orderId]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setIsSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      currentOrder?.paymentMethod === 'Paypal' &&
      !currentOrder?.isPaid &&
      !window.paypal
    ) {
      addPayPalScript();
    } else {
      setIsSdkReady(true);
    }
  }, [currentOrder?.paymentMethod, currentOrder?.isPaid]);

  return (
    <StyledOrder>
      <Helmet>
        <title>Witcher Shop | Order</title>
        <meta name='description' content='Watch your order status and data' />
      </Helmet>
      {isLoading ? (
        <Loader size={80} message='Loading order...' />
      ) : error ? (
        <Error message='No order found with this id' />
      ) : (
        !error &&
        !isLoading &&
        currentOrder && (
          <StyledOverview>
            <Brief>
              <h3>Order no. {currentOrder._id}</h3>
              <h3>Contact Details:</h3>
              <p>Name: {loggedUser.name}</p>
              <p>Email: {loggedUser.email}</p>
              <p>
                Address: {currentOrder.shippingAddress.address}{' '}
                {currentOrder.shippingAddress.city}{' '}
                {currentOrder.shippingAddress.postalCode}{' '}
                {currentOrder.shippingAddress.country}
              </p>
              {currentOrder.isPaid && (
                <p>
                  <span>
                    Status:{' '}
                    {currentOrder.isDelivered
                      ? `delivered at: ${currentOrder.deliveredAt}`
                      : 'awaiting delivery'}
                  </span>
                </p>
              )}
              <h3>Payment:</h3>
              <p>{currentOrder.paymentMethod}</p>
              <p>
                <span>
                  Status:{' '}
                  {currentOrder.isPaid
                    ? `paid at: ${currentOrder.paidAt}`
                    : 'awaiting payment'}
                </span>
              </p>
              <h3>Items:</h3>
              <h4 onClick={() => setIsWatchingItems(!isWatchingItems)}>
                Click to watch items in order ({currentOrder.orderItems.length})
                {isWatchingItems ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
              </h4>
              {isWatchingItems &&
                currentOrder.orderItems.map((item) => (
                  <ProductRow product={item} usage='order' key={uuidv4()} />
                ))}
            </Brief>
            <Payment>
              <h3>Order Summary:</h3>
              <p>Price: ${currentOrder.totalPrice}</p>
              <p>Shipping: Free</p>
              <p>Total price: ${currentOrder.totalPrice}</p>
              {currentOrder.isPaid && <h3>Paid</h3>}
              {loadingPay && <Loader size={40} />}
              {!currentOrder.isPaid && (
                <>
                  {currentOrder.paymentMethod === 'PayPal' ? (
                    <>
                      {!isSdkReady && <Loader size={40} />}
                      <PayPalButton
                        amount={currentOrder.totalPrice}
                        onSuccess={payPalSuccessHandler}
                      />
                    </>
                  ) : (
                    stripeCheckout && (
                      <StripeCheckout
                        token={stripeSuccessHandler}
                        stripeKey={publishableKey}
                        amount={currentOrder.totalPrice * 100}
                        currency='USD'
                        name={`Order no. ${currentOrder._id}`}
                        email={loggedUser.email}
                      />
                    )
                  )}
                </>
              )}
            </Payment>
          </StyledOverview>
        )
      )}{' '}
    </StyledOrder>
  );
};

const StyledOrder = styled(GlobalPageInit)`
  margin-top: 1rem;
`;

const StyledOverview = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Payment = styled.div`
  max-width: 35rem;
  padding: 1rem 2rem 1rem 1rem;
  margin-top: 2rem;
  border: 1px solid black;

  p,
  button {
    margin-top: 1rem;
  }

  p:last-of-type {
    margin-bottom: 1rem;
  }

  @media (min-width: 1000px) {
    width: 30%;
    height: max-content;
  }
`;

const Brief = styled.div`
  svg {
    margin-left: 0.5rem;
    vertical-align: middle;
  }

  h3 {
    margin-top: 1rem;
  }

  p,
  h4 {
    margin-top: 0.5rem;
  }

  h4 {
    width: max-content;
    padding: 0.5rem 1rem 0.5rem 0.2rem;
    background: ${colorsVariables.colorSecDark};
    color: ${colorsVariables.colorMainLight};
    cursor: pointer;
  }

  p span {
    padding: 0.3rem;
    background: ${colorsVariables.colorSecDark};
    color: ${colorsVariables.colorWhite};
    font-weight: bold;
  }
`;

export default Order;
