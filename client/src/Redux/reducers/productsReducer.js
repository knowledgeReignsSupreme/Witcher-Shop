import {
  PRODUCTS_GET_FAIL,
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_SUCCESS,
} from '../consts';

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        products: action.payload,
      };

    case PRODUCTS_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
