import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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
