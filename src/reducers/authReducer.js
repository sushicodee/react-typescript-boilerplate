import { getItem } from 'components/utils/localStorage/LocalStorage';
import {
  LOGIN_FALIURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_IS_LOADING
} from './../actions/user/types';

let user = JSON.parse(getItem('user')) || {};

const initialState = {
  user: user,
  isAuthenticated: false,
  isAuthorized:user && user.role ? true : false,
  isSubmitting: false,
  isLoggedin: user && user.role ? true : false,
  errorMessage: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        isSubmitting: false,
        isAuthorized:true,
        isAuthenticated:true,
        user: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case LOGIN_FALIURE:
      return {
        ...state,
        isSubmitting: false,
        errorMessage: action.payload,
      };
    case LOGOUT:
      return {
          ...state,
          isAuthorized:false,
          isAuthenticated:false,
          isLoggedin:false,
          user:{}
      };

    default:
      return state;
  }
};
