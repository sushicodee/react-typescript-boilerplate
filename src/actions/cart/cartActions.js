import { axiosApi } from 'api/axios/axiosApi';
import Snackbar from 'components/utils/notification/Snackbar';
import {
    CART_DELETE_ITEM,
    CART_ADD_ITEM,
  } from './types';

  export const addToCart = (prodId,qty) =>async(dispatch) => {
      try{
        const data = await axiosApi.get('product/details/'+prodId,)
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                id:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                description:data.description,
                quantity:data.quantity,
                qty:qty||1}
        })
      }
      catch(err){
         Snackbar.handleError(err)   
      }
  }

  export const deleteCartItem = (id) => async(dispatch) => {
    try{
      dispatch({
          type:CART_DELETE_ITEM,
          payload:id,
      })
    }
    catch(err){
       Snackbar.handleError(err)   
    }
    
}