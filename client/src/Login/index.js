import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/User/actions';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit, StyledForm } from '../GlobalStyles';
import GoogleSignin from '../Common/GoogleSignin';
import Loader from '../Common/Loader';
import Button from '../Common/Button';
import Input from '../Common/Input';

const Login = ({ match }) => {
  let redirectTo = match.params.redirectPath;
  redirectTo = redirectTo === 'home' ? '/' : redirectTo;

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser, isLoading, error } = userLogin;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(redirectTo);
    if (loggedUser) {
      history.push(`/${redirectTo}`);
    }
  }, [history, loggedUser, redirectTo]);

  return (
    <>
      {!loggedUser && (
        <StyledLogin>
          <FormStyled onSubmit={loginHandler}>
            <h3>Log in to your account</h3>
            <Input
              label='Email:'
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              required='true'
              type='email'
            />
            <Input
              label='Password'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required='true'
              type='password'
            />
            {isLoading ? (
              <Loader size={15} message='Sending information...' />
            ) : (
              <Button color='red' text='Log in' submit />
            )}
            {error && <h4>{error}</h4>}
            <p>
              Don't have an account yet?{' '}
              <Link to={`/register/redirect=${redirectTo}`}>Sign up</Link>
            </p>
          </FormStyled>
          <GoogleSignin text='Log in' />
        </StyledLogin>
      )}
    </>
  );
};

const StyledLogin = styled(GlobalPageInit)`
  margin-top: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  h4 {
    color: red;
    margin-bottom: 1rem;
  }
`;

const FormStyled = styled(StyledForm)``;

export default Login;
