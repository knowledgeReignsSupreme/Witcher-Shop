import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_CREATE_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from './constants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        success: true,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentOrder: action.payload,
        success: true,
      };

    case ORDER_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
