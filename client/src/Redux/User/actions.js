import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
} from './constants';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios.post(
      '/api/v1/users/register',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('loggedUser', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('loggedUser', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const googleLogin = (tokenId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GOOGLE_LOGIN_REQUEST,
    });
    const { data } = await axios.post(
      '/api/v1/users/googlelogin',
      { tokenId },
      config
    );
    const userData = data?.data;
    dispatch({
      type: USER_GOOGLE_LOGIN_SUCCESS,
      payload: userData,
    });

    localStorage.setItem('loggedUser', JSON.stringify(userData));
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: ' USER_LOGOUT',
  });
  localStorage.removeItem('loggedUser');
};
