import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserOrders } from '../Redux/User/actions';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import UserInfo from './UserInfo';
import ViewOrders from './ViewOrders';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentViewedOrder, setCurrentViewedOrder] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { userInfo, isLoading, error: userOrdersError } = userProfile;

  const userOrders = useSelector((state) => state.userOrders);
  const {
    awaitingPaymentOrders,
    awaitingDeliveryOrders,
    deliveredOrders,
    isLoading: userOrdersLoading,
    success: userOrdersSuccess,
  } = userOrders;

  const orders = {
    awaitingPaymentOrders,
    awaitingDeliveryOrders,
    deliveredOrders,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loggedUser === null) {
      history.push('/login/redirect=profile');
    } else if (!userInfo) {
      dispatch(getUserOrders(loggedUser._id));
      dispatch(getUserProfile());
    }
  }, [history, loggedUser, dispatch, userInfo]);

  return (
    <StyledProfile>
      {userInfo && (
        <Helmet>
          <title>Witcher Shop | {userInfo.name}</title>
          <meta
            name='description'
            content='View your profile details and orders you have placed'
          />
        </Helmet>
      )}
      {isLoading ? (
        <Loader size={80} message='Loading profile...' />
      ) : userOrdersError ? (
        <Error message='Try refreshing the page' />
      ) : (
        !isLoading &&
        userInfo && (
          <Info>
            <UserInfo loggedUser={loggedUser} />
            {userOrdersLoading ? (
              <Loader size={30} message='Loading orders info...' />
            ) : (
              !userOrdersLoading &&
              userOrdersSuccess && (
                <ViewOrders
                  orders={orders}
                  currentViewedOrder={currentViewedOrder}
                  setCurrentViewedOrder={setCurrentViewedOrder}
                />
              )
            )}
          </Info>
        )
      )}
    </StyledProfile>
  );
};

const StyledProfile = styled(GlobalPageInit)`
  margin-top: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

export default Profile;
