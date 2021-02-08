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
      <h3>{text} using google</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={`${text} with Google`}
        onSuccess={successGoogleResponse}
        onFailure={failGoogleResponse}
        cookiePolicy={'single_host_origin'}
      />
    </StyledGoogleLogin>
  );
};

const StyledGoogleLogin = styled.div`
  width: 95%;
  border-top: 1px solid black;
  padding-top: 1rem;

  @media (min-width: 600px) {
    width: 35rem;
    margin: 0 auto;
  }

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
