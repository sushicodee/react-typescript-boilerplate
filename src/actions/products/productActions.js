import { axiosApi } from 'api/axios/axiosApi';
import Snackbar from 'components/utils/notification/Snackbar';
import {
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  FETCH_PRODUCTS,
  FETCH_SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_ERROR,
  SET_IS_LOADING,
  SET_PAGE_NUMBER,
  SET_FILTER_CONDITION,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT_ERROR,
  FETCH_ATTRIBUTES,
  FETCH_PRODUCT_DETAILS,
  FETCH_ALL_PRODUCTS
} from './types';

export const fetchDetails = (id) => async(dispatch) => {
  try{
    dispatch(setLoading(true))
    const data = await axiosApi.get(`/product/details/${id}`)
    dispatch({type:FETCH_PRODUCT_DETAILS,payload:data})
  }
  catch (err) {

  }
  finally{
    dispatch(setLoading(false))
  }
}
export const fetchProducts = (perPage = 20, currentPage = 1) => (dispatch) => {
  dispatch(setLoading(true));
  axiosApi
    .get(
      '/product',
      {
        params: {
          perPage,
          currentPage,
        },
      },
      true,
    )
    // axiosApi.get('/product',{params:{currentPage:pageNumber,perPage:pageSize}},true)
    .then((data) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
      });
    })
    .catch((err) => {
      Snackbar.handleError(err);
      dispatch({ type: FETCH_PRODUCTS_ERROR, payload: err });
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const addProduct = (data,isSecure) => async(dispatch) =>{
  // return new Promise((resolve,reject) => async(dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axiosApi.post('/product', data, isSecure);
      dispatch({ type: ADD_PRODUCT, payload: data });
      // resolve(data)
    } catch (err) {
      Snackbar.handleError(err);
      // reject(err);
    } finally {
      dispatch(setLoading(false));
    }
  // })
};

export const updateProduct = (data, isSecure) => async(dispatch) => {
  // return new Promise((resolve,reject) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.put(`/product/${data._id}`, data, isSecure);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
    // resolve(data)
  } catch (err) {
    Snackbar.handleError(err);
    // reject(err);
  } finally {
    dispatch(setLoading(false));
  }
// })
};

export const deleteProduct = (id, isSecure) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.delete(`/product/${id}`, data, isSecure);
    dispatch({ type: DELETE_PRODUCT, payload: data });
    
  } catch (err) {
    Snackbar.handleError(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const searchProducts = (conditionData = {},options = {}) => async (dispatch) => {
  try {
    const {perPage,currentPage} = options;
    dispatch(setLoading(true));
    for (let key in conditionData) {
      if (conditionData[key].length === 0) {
        delete conditionData[key];
      }
    }
    const data = await axiosApi.post(
      '/product/search',
      conditionData,
      {params: {
        perPage,
        currentPage,
      },},
      false,
    );
    dispatch({ type: FETCH_SEARCH_PRODUCTS, payload: data });
    // dispatch({type:FETCH_ATTRIBUTES});
  } catch (err) {
    dispatch({
      type: SEARCH_PRODUCTS_ERROR,
      payload: err,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.post(
      '/product/search',
      {},
      {},
      false,
    );
    dispatch({ type: FETCH_ALL_PRODUCTS, payload: data });
    dispatch({type:FETCH_ATTRIBUTES});
  } catch (err) {
    dispatch({
      type: SEARCH_PRODUCTS_ERROR,
      payload: err,
    });
  } finally {
    dispatch(setLoading(false));
  }
};
export const setFilterCondition = (cond) => ({
  type: SET_FILTER_CONDITION,
  payload: cond,
});

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.get('/product/categories', {}, {}, false);
    dispatch({ type: FETCH_CATEGORIES, payload: data });
  } catch (err) {
    Snackbar.handleError(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSubCategories = () => ({ type: FETCH_SUBCATEGORIES });
export const fetchAttributes =() => (dispatch) => dispatch({type:FETCH_ATTRIBUTES});
const setLoading = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});

export const handlePageNumber = (pageNumber) => (dispatch) => {
  dispatch({
    type: SET_PAGE_NUMBER,
    payload: pageNumber,
  });
};

export const setProductError = (err) => dispatch => {
  dispatch({
    type:SET_PRODUCT_ERROR,
    payload:err
  })
}
