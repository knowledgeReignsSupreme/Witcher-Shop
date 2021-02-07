import React from 'react';
import styled from 'styled-components';
import { GlobalPageInit } from '../GlobalStyles';
import GoogleSignin from '../Common/GoogleSignin';

const Login = () => {
  return (
    <StyledLogin>
      <GoogleSignin text='Sign in with Google' />
    </StyledLogin>
  );
};

const StyledLogin = styled(GlobalPageInit)``;
export default Login;
