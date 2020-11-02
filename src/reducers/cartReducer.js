import { CART_ADD_ITEM, CART_DELETE_ITEM } from 'actions/cart/types';
const INITIAL_STATE = {
  cartItems: [],
};
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((p) => p.id === item.id);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) => (p.id === item.id ? item : p)),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    case CART_DELETE_ITEM:
        return {
          ...state,
          cartItems: [...state.cartItems.filter(p => p.id !== action.payload)],
      }

    default:
      return state;
  }
};
