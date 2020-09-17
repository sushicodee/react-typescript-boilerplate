import {productReducer} from './productReducer';
import {authReducer} from './authReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    product:productReducer,
    auth:authReducer,
})
