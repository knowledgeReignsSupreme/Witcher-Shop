import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../Redux/User/actions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import Loader from '../Common/Loader';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { userInfo, isLoading } = userProfile;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loggedUser === null) {
      history.push('/login/redirect=profile');
    } else {
      dispatch(getUserProfile());
    }
  }, [history, loggedUser, dispatch]);

  return (
    <StyledProfile>
      {isLoading ? (
        <Loader size={80} message='Loading profile...' />
      ) : (
        !isLoading && userInfo && <h1>{userInfo.name}</h1>
      )}
    </StyledProfile>
  );
};

const StyledProfile = styled(GlobalPageInit)``;

export default Profile;
