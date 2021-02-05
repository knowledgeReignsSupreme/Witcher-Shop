import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './constants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data.data._id,
      title: data.data.title,
      image: data.data.image,
      countInStock: data.data.countInStock,
      slug: data.data.slug,
      price: data.data.price,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      productId: id,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
