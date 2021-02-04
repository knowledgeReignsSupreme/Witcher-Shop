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
} from './constants';

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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        currentProduct: action.payload.data,
      };

    case PRODUCT_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const relatedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case RELATED_PRODUCTS_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case RELATED_PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        relatedProducts: action.payload.data,
      };

    case RELATED_PRODUCTS_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const topProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case TOP_PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        products: action.payload,
      };

    case TOP_PRODUCTS_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
