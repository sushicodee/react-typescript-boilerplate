import { axiosApi } from 'api/axios/axiosApi'
import { clearStorage, setItem } from 'components/utils/localStorage/LocalStorage'
import Snackbar from 'components/utils/notification/Snackbar'
import {LOGIN_FALIURE,LOGIN_REQUEST,LOGIN_SUCCESS,LOGOUT,SET_IS_LOADING} from './types'
export const login = (data) => dispatch => {
    return new Promise((resolve,reject) =>{
        dispatch({
            type:LOGIN_REQUEST
        })
        dispatch(setLoading(true))
        axiosApi.post('/auth/login', data ,{},true)
        .then(data => {
            Snackbar.showSuccess(`${data.user.username} Logged in Successfully`)
            setItem('token',data.token) 
            setItem('user',JSON.stringify(data.user))
            dispatch({
                type:LOGIN_SUCCESS,
                payload:data.user
            })
            resolve('success')
        })
        .catch(err => {
            Snackbar.handleError(err.data);
            dispatch({
                type:LOGIN_FALIURE,
                payload:err.data.message
            })
            reject('error');
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
    })
}


// const updateUser = (data) => dispatch => {
//     //todo
// }

export const logout = () => dispatch => {
    clearStorage()
    dispatch({type:LOGOUT})
}

const setLoading = (payload) => ({
    type: SET_IS_LOADING,
    payload,
  });


