import { FETCH_PRODUCTS,SET_IS_LOADING,SET_PAGE_NUMBER} from "actions/products/types"

const initialState = {
    products:[],
    isLoading:false,
    currentPage:1,
    perPage:10,
}

export const productReducer = (state= initialState, action)=>{
    switch(action.type){
        case FETCH_PRODUCTS:{
            return {
                ...state,
                products:action.payload
            }
        }
        case SET_IS_LOADING:{
            return {
                ...state,
                isLoading:action.payload
            }
        }
        case SET_PAGE_NUMBER:{
            return {
                ...state,
                currentPage:action.payload
            }
        }
        default: return state;
    }
}