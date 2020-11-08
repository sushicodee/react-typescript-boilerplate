import { axiosApi } from 'api/axios/axiosApi';
import Snackbar from 'components/utils/notification/Snackbar';
import {ADD_TO_FAVORITES,REMOVE_FROM_FAVORITES} from './types';

export const addToCart = (prodId) =>async(dispatch) => {
      dispatch({
          type:ADD_TO_FAVORITES,
          payload:prodId
      })
}

export const deleteCartItem = (prodId) => async(dispatch) => {
    dispatch({
        type:REMOVE_FROM_FAVORITES,
        payload:prodId,
    })
    Snackbar.handleError(err)   
  
}