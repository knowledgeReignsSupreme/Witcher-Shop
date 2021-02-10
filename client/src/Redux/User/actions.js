import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
  USER_GET_ORDERS_REQUEST,
  USER_GET_ORDERS_SUCCESS,
  USER_GET_ORDERS_FAIL,
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
    const userInfo = data?.data;

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: userInfo,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    });

    localStorage.setItem('loggedUser', JSON.stringify(userInfo));
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

    const userInfo = data?.data;

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    });

    localStorage.setItem('loggedUser', JSON.stringify(userInfo));
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
    type: USER_LOGOUT,
  });
  await axios.post(`/api/v1/users/logout`);
  localStorage.removeItem('loggedUser');
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { data } = await axios.get('/api/v1/users/profile');

    const userInfo = data?.data?.user;

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: userInfo,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/users/${userId}/orders`);

    const ordersInfo = data?.data;

    dispatch({
      type: USER_GET_ORDERS_SUCCESS,
      payload: ordersInfo,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_ORDERS_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};
