import { axiosApi } from 'api/axios/axiosApi';
import Snackbar from 'components/utils/notification/Snackbar';
import { FETCH_PRODUCTS, SET_IS_LOADING ,SET_PAGE_NUMBER} from './types';
export const fetchProducts = (perPage = 20,currentPage = 1) => (dispatch) => {
  //call api
  dispatch(setLoading(true));
  axiosApi
    .get('/product', {
      params:{
        perPage,currentPage
      }
    }, true)
    // axiosApi.get('/product',{params:{currentPage:pageNumber,perPage:pageSize}},true)
    .then((data) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
      });
    })
    .catch((err) => {
      Snackbar.handleError(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

const setLoading = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});

export const handlePageNumber = (pageNumber) => dispatch => {
  dispatch({
    type:SET_PAGE_NUMBER,
    payload:pageNumber
  })
}
