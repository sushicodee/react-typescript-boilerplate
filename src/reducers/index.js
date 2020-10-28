import {curriedProductReducer} from './productReducer';
import {authReducer} from './authReducer';
import {combineReducers} from 'redux';
import { appReducer } from './appReducer';

export default combineReducers({
    product:curriedProductReducer,
    auth:authReducer,
    app:appReducer,
})
