import { Category } from '@material-ui/icons';
import produce from 'immer';
import {
  FETCH_PRODUCTS,
  FETCH_SEARCH_PRODUCTS,
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  SET_IS_LOADING,
  SET_PAGE_NUMBER,
  SET_FILTER_CONDITION,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_ATTRIBUTES,
  FETCH_PRODUCT_DETAILS,
  FETCH_ALL_PRODUCTS
} from 'actions/products/types';


const initialState = {
  allProducts:[],
  products: [],
  searchResults: [],
  searchCount:0,
  isLoading: false,
  currentPage: 1,
  perPage: 10,
  categories: [],
  subCategories: [],
  filterCondition: {},
  attributes: {},
  productDetails: {},

};

// export const productReducer = (state = initialState, action) => {
const productReducer = (draft, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      draft.products = action.payload;
      return;
    }

    case FETCH_ALL_PRODUCTS: {
      draft.allProducts = action.payload;
      return;
    }

    case FETCH_PRODUCT_DETAILS:
      draft.productDetails = action.payload;
      return;

    case ADD_PRODUCT: {
      draft.products.push(action.payload)
    }

    case DELETE_PRODUCT: {
      draft.products = draft.products.filter((p) => p.__id !== action.payload);
      return;
    }
    case UPDATE_PRODUCT: {
      draft.products = draft.products.map((product) => {
        if (product._id === action.payload.__id) {
          return action.payload;
        }
      })
      return;
    }

    case SET_FILTER_CONDITION: {
      draft.filterCondition = action.payload;
      return;
    }

    case FETCH_SEARCH_PRODUCTS: {
      draft.searchResults = action.payload.data;
      draft.searchCount = action.payload.count;
      return;
    }
    case SET_IS_LOADING: {
      draft.isLoading = action.payload;
      return;
    
    }
    case SET_PAGE_NUMBER: {
      draft.currentPage = action.payload;
      return;
    }

    case FETCH_CATEGORIES: {
     
      // draft.categories = action.payload;
      return;
    }

    case FETCH_SUBCATEGORIES: {
      let subCategories = [];
      let sub = [];
      draft.selectedCategories.forEach((cat) => {
        let subs = draft.searchResults.filter((item) => item.category === cat);
        subCategories = [draft.subCategories,subs];
      });
      subCategories.forEach((data) => {
        if (data.subCategory && sub.includes(data.subCategory)) {
        } else {
          sub.push(data.subCategory);
        }
      });
      draft.subCategories = subCategories;
      return;
    }

    case FETCH_ATTRIBUTES: {
      const attr = {};
      const keys = ['brand','category','color','price'];
      const products = draft.searchResults;
      if(Object.keys(draft.filterCondition).length === 0){
        products.filter(prod => {
          for(let key in draft.filterCondition){
            return draft.filterCondition[key].includes(prod[key])
          }
      })
      }
      products.forEach(prod => {
        keys.forEach(key => {
          if(prod[key] && attr[key] === undefined){
            attr[key] = [prod[key]]
          }
          else if(prod[key]  && attr[key].indexOf(prod[key] === -1)){
            attr[key].push(prod[key])
          }
        })
      })
      keys.forEach(key => {
        attr[key] = [...new Set(attr[key])]
      })
      draft.attributes = attr;
      return;
    }
    default:
      return draft;
  }
};

export const curriedProductReducer = produce(productReducer,initialState);
