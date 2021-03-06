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
  FETCH_ALL_PRODUCTS,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT
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

export const addProduct = (product,isSecure) => async(dispatch) =>{
  // return new Promise((resolve,reject) => async(dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axiosApi.post('/product', product, isSecure);
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

export const updateProduct = (product, isSecure) => async(dispatch) => {
  // return new Promise((resolve,reject) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.put(`/product/${product._id}`, product, isSecure);
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
    const data = await axiosApi.delete(`/product/${id}`,{}, isSecure);
    dispatch({ type: DELETE_PRODUCT, payload: data });
  } catch (err) {
    Snackbar.handleError(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const likeProduct = (userId,prevData, isSecure,page = '') => async (dispatch) => {
  const newData = {...prevData,loves:[...prevData.loves,userId]};
  dispatch({ type: LIKE_PRODUCT, payload: newData});
  if(page == 'productDetails'){
    //can cause problem after adding projection todo
    dispatch({type:FETCH_PRODUCT_DETAILS,payload:newData})
  }
  try {
    const data = await axiosApi.patch(`/product/like`,{_id:prevData._id},{}, isSecure);
    dispatch({ type: LIKE_PRODUCT, payload: data });
    if(page == 'productDetails'){
      dispatch({type:FETCH_PRODUCT_DETAILS,payload:data})
    }
    Snackbar.showInfo(`${data.name} Added to Favorites`)
  } catch (err) {
    dispatch({ type: LIKE_PRODUCT, payload: prevData });
    if(page == 'productDetails'){
      dispatch({type:FETCH_PRODUCT_DETAILS,payload:prevData})
    }
  } finally {
  }
};

export const unlikeProduct = (userId,prevData,isSecure,page = '') => async (dispatch) => {
  const newData = {...prevData,loves:[...prevData.loves.filter(id => id!==userId)]};
  dispatch({ type: UNLIKE_PRODUCT, payload: newData});
  if(page == 'productDetails'){
    //can cause problem after adding projection todo
    dispatch({type:FETCH_PRODUCT_DETAILS,payload:newData})
  }
  try {
    const data = await axiosApi.patch(`/product/unlike`,{_id:prevData._id},{}, isSecure);
    dispatch({ type: UNLIKE_PRODUCT, payload: data });
    if(page == 'productDetails'){
      dispatch({type:FETCH_PRODUCT_DETAILS,payload:data})
    }
  } catch (err) {
    dispatch({ type: UNLIKE_PRODUCT, payload: prevData});
    if(page == 'productDetails'){
      dispatch({type:FETCH_PRODUCT_DETAILS,payload:prevData})
    }
  } finally {
  }
};


export const searchProducts = (conditionData = {},options = {}) => async (dispatch) => {
  try {
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
        ...options
      },},
      false,
    );
    dispatch({ type: FETCH_SEARCH_PRODUCTS, payload: data });
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

export const setFilterCondition = (key,condition,filterKey) => ({
  type: SET_FILTER_CONDITION,
  payload:{key,condition,filterKey}
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
