import {
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  RELATED_PRODUCTS_GET_REQUEST,
  RELATED_PRODUCTS_GET_SUCCESS,
  RELATED_PRODUCTS_GET_FAIL,
  TOP_PRODUCTS_GET_REQUEST,
  TOP_PRODUCTS_GET_SUCCESS,
  TOP_PRODUCTS_GET_FAIL,
} from '../consts';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getProducts = (
  pageNumber,
  category = '',
  sort = '',
  keyword = 'nokeyword'
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_GET_REQUEST });

    const { data } = await axios.get(
      `/api/v1/products?page=${pageNumber}&category=${category}&sort=${sort}&keyword=${keyword}`,
      config
    );

    dispatch({ type: PRODUCTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_GET_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_GET_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${productId}`, config);

    dispatch({ type: PRODUCT_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const getRelatedProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_PRODUCTS_GET_REQUEST });

    const { data } = await axios.get(
      `/api/v1/products/${productId}/related`,
      config
    );

    dispatch({ type: RELATED_PRODUCTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RELATED_PRODUCTS_GET_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_GET_REQUEST });

    const { data } = await axios.get(
      '/api/v1/products?sort=-rating&limit=3&keyword=nokeyword',
      config
    );

    dispatch({ type: TOP_PRODUCTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_GET_FAIL,
      payload: error.response.data.err
        ? error.response.data.err
        : error.message,
    });
  }
};
