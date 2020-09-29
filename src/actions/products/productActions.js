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
  SET_SELECTED_CATEGORIES, SET_FILTER_CONDITION ,SET_SELECTED_SUBCATEGORIES
} from './types';
import {useSelector} from 'react-redux';
export const fetchProducts = (perPage = 20, currentPage = 1) => (dispatch) => {
  //call api
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

export const searchProducts = (conditionData) => async (dispatch) => {
  try {
    console.log(conditionData,'inside search condition')
    dispatch(setLoading(true));
    for(let key in conditionData){
      if(conditionData[key].length === 0){
        delete conditionData[key];
      }
    }
    dispatch(setfilterCondition(conditionData));
    const data = await axiosApi.post(
      '/product/search',
      conditionData,
      {},
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

const setfilterCondition = (cond) => ({type:SET_FILTER_CONDITION,payload:cond})


export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axiosApi.post('/product/search', {}, {}, false);
    dispatch({ type: FETCH_CATEGORIES, payload: data });
  } catch (err) {
    Snackbar.handleError(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setSelectedCategories = (cat) => async(dispatch) => {
  dispatch({ type: SET_SELECTED_CATEGORIES, payload:cat });
  dispatch(fetchSubCategories());
  dispatch({type:SET_SELECTED_SUBCATEGORIES,payload:[]})
}

export const setSelectedSubCategories = (cat) => async(dispatch) => {
  dispatch({ type: SET_SELECTED_SUBCATEGORIES, payload:cat });
}

export const fetchSubCategories = () => 
    ({ type: FETCH_SUBCATEGORIES});

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
