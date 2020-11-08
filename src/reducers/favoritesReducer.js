import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES,FAVORITES_CLEAR_ALL} from 'actions/favorites/types';
const INITIAL_STATE = {
  favoriteItems: [],
};
export const favoritesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteItems: action.payload,
      };
    case REMOVE_FROM_FAVORITES:
        return {
          ...state,
          favoriteItems: action.payload,
    };
    case FAVORITES_CLEAR_ALL:
        state = INITIAL_STATE;
        return{
            state
        }
    default:
      return state;
  }
};