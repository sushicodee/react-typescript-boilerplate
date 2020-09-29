import {SET_PROGRESS} from './../actions/app/types';

const initialState = {
    theme:'light',
    progress:false,
}

export default (state = initialState, action) => {
    switch (action.type){
        case SET_PROGRESS: 
        return {
            ...state,
            progress:action.payload
        }
        default :return state;
    }
}