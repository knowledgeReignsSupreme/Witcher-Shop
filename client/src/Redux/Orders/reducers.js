import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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

    default:
      return state;
  }
};
