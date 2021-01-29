import {
  PRODUCTS_GET_FAIL,
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
} from '../consts';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getProducts = (category = 'category=silver-swords') => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCTS_GET_REQUEST });

    const { data } = await axios.get(`/api/v1/products?${category}`, config);

    dispatch({ type: PRODUCTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_GET_FAIL, payload: error.message });
  }
};
