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
} from './constants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, isLoading: false, loggedUser: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, isLoading: false, loggedUser: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case USER_GOOGLE_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return { ...state, isLoading: false, loggedUser: action.payload };
    case USER_GOOGLE_LOGIN_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, userInfo: action.payload };
    case USER_PROFILE_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
