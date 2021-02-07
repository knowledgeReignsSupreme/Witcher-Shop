import React from 'react';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../Redux/User/actions';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';

const GoogleSignin = ({ text }) => {
  const dispatch = useDispatch();

  const successGoogleResponse = (response) => {
    dispatch(googleLogin(response.tokenId));
  };

  const failGoogleResponse = (response) => {
    alert('Google signin failed. Please try again');
  };

  return (
    <StyledGoogleLogin>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={text}
        onSuccess={successGoogleResponse}
        onFailure={failGoogleResponse}
        cookiePolicy={'single_host_origin'}
      />
    </StyledGoogleLogin>
  );
};

const StyledGoogleLogin = styled.div`
  button {
    color: ${colorsVariables.colorWhite} !important;
    background: ${colorsVariables.colorSecDark} !important;
  }
  svg {
    color: ${colorsVariables.colorWhite} !important;
    background: ${colorsVariables.colorSecDark} !important;
  }

  div {
    background: ${colorsVariables.colorSecDark} !important;
    background: ${colorsVariables.colorSecDark} !important;
  }
`;
export default GoogleSignin;
