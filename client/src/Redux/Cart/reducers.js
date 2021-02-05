import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedItem = action.payload;

      const itemExists = state.cartItems.find(
        (cartItem) => cartItem.productId === addedItem.productId
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === itemExists.productId ? addedItem : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, addedItem],
        };
      }

    case CART_REMOVE_ITEM:
      const itemsAfterRemove = state.cartItems.filter(
        (cartItem) => cartItem.productId !== action.payload.productId
      );
      console.log(itemsAfterRemove);
      return {
        ...state,
        cartItems: itemsAfterRemove,
      };

    default:
      return state;
  }
};
