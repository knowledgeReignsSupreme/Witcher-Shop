import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from './constants';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post('/api/v1/orders', order, config);

    const orderInfo = data?.data;

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: orderInfo,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const getOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_GET_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/orders/${orderId}`);

    const orderInfo = data?.order;

    dispatch({
      type: ORDER_GET_SUCCESS,
      payload: orderInfo,
    });
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    let { data } = await axios.put(
      `/api/v1/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};
