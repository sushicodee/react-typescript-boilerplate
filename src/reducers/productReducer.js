import {
  FETCH_PRODUCTS,
  FETCH_SEARCH_PRODUCTS,
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  SET_IS_LOADING,
  SET_PAGE_NUMBER,
  SET_SELECTED_CATEGORIES,
  SET_FILTER_CONDITION, SET_SELECTED_SUBCATEGORIES
} from 'actions/products/types';

const initialState = {
  products: [],
  searchResults: [],
  isLoading: false,
  currentPage: 1,
  perPage: 10,
  categories: [],
  subCategories: [],
  selectedCategories:[],
  selectedSubCategories:[],
  filterCondition:{},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case SET_FILTER_CONDITION:{
        const copy = Object.assign(state.filterCondition,state.selectedCategories,state.selectedSubCategories,{});
        for(let key in action.payload){
            copy[key] = action.payload[key];
        }
        return{
            ...state,
            filterCondition:copy
        }
    }

    case FETCH_SEARCH_PRODUCTS: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_PAGE_NUMBER: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    case FETCH_CATEGORIES: {
      let categories = [];
      (action.payload || []).forEach((product) => {
        if (categories.indexOf(product.category) === -1) {
          categories.push(product.category);
        }
      });
      return {
        ...state,
        categories,
      };
    }

    case SET_SELECTED_CATEGORIES :{
        return{
            ...state,
            selectedCategories:action.payload,
            selectedSubCategories:[],
        }
    }

    case SET_SELECTED_SUBCATEGORIES :{
        return {
            ...state,
            selectedSubCategories:action.payload,
        }
    }

    case FETCH_SUBCATEGORIES: {
      let subCategories = [];
      let sub = [];
      state.selectedCategories.forEach((cat) => {
        let subs = state.searchResults.filter((item) => item.category === cat);
        subCategories = [...subCategories, ...subs];
      });
      subCategories.forEach((data) => {
        if (data.subCategory && sub.includes(data.subCategory)) {
        } else {
          sub.push(data.subCategory);
        }
      });
      return {
        ...state,
        subCategories: sub.filter((data) => data),
      };
    }
    default:
      return state;
  }
};
