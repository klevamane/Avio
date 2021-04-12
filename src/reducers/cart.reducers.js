import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart.constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // product is going to be the id
      // check if item already exists in cart
      const itemAlreadyExists = state.cartItems.find(
        (x) => x.product === item.product,
      );
      if (itemAlreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemAlreadyExists.product ? item : x,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
