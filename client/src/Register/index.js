import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Redux/User/actions';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalPageInit, colorsVariables } from '../GlobalStyles';
import GoogleSignin from '../Common/GoogleSignin';
import Loader from '../Common/Loader';
import Input from '../Common/Input';
import Button from '../Common/Button';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [registerAttempt, setRegisterAttempt] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, loggedUser } = userRegister;

  const isValidEmail = (e) => {
    // eslint-disable-next-line
    var filter = /^\s*[\w\-_]+(\.[\w\-_]+)*\@[\w\-_]+\.[\w\-_]+(\.[\w\-_]+)*\s*$/;
    return String(e).search(filter) !== -1;
  };

  const inputsValidator = useCallback(() => {
    if (name.trim().length <= 2) {
      setNameError('Name must containt at least 2 characters');
    } else {
      setNameError(false);
    }
    if (!isValidEmail(email)) {
      setEmailError('Please use a valid email address');
    } else {
      setEmailError(false);
    }
    if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters');
    } else {
      setPasswordError(false);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords must match');
    } else {
      setConfirmPasswordError(false);
    }
  }, [confirmPassword, email, name.length, password]);

  const checkBeforeSubmit = () => {
    if (
      name.trim().length > 2 &&
      isValidEmail(email) &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setRegisterAttempt(true);
    if (checkBeforeSubmit()) {
      dispatch(register(name, email.toLowerCase(), password));
    }
  };

  useEffect(() => {
    if (registerAttempt) {
      inputsValidator();
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    inputsValidator,
    registerAttempt,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (loggedUser) {
      history.push('/');
    }
  }, [history, loggedUser]);

  return (
    <StyledRegister>
      <StyledForm onSubmit={submitHandler}>
        <h3>Start upgrading your witcher gear!</h3>
        <Input
          label='Name:'
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
          required='true'
          error={nameError}
        />
        <Input
          label='Email:'
          placeholder='Enter your email address'
          onChange={(e) => setEmail(e.target.value)}
          required='true'
          type='email'
          error={emailError}
        />
        <Input
          label='Password:'
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
          required='true'
          type='password'
          error={passwordError}
        />
        <Input
          label='Confirm password:'
          placeholder='Enter password again'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required='true'
          type='password'
          error={confirmPasswordError}
        />
        <Button
          text='Register'
          type='red'
          args={['']}
          event
          handleClick={submitHandler}
        />
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </StyledForm>
      <StyledGoogleRegister>
        <h3>Register using google</h3>
        <GoogleSignin text='Register with Google' />
      </StyledGoogleRegister>
    </StyledRegister>
  );
};

const StyledRegister = styled(GlobalPageInit)`
  margin-top: 1rem;
  h3 {
    margin-bottom: 1rem;
  }
`;

const StyledForm = styled.form`
  margin-bottom: 1rem;
  width: 100%;
  button {
    margin-bottom: 1rem;
  }

  input {
    width: 85%;
  }

  p {
    width: 90%;
  }

  a {
    color: ${colorsVariables.colorLink};
    font-weight: bold;
  }

  div {
    margin-top: 1rem !important;
  }

  @media (min-width: 600px) {
    width: 25rem;
  }
`;

const StyledGoogleRegister = styled.div`
  border-top: 1px solid black;
  padding-top: 1rem;
`;
export default Register;
