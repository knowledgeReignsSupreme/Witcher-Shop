import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './constants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
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

      return {
        ...state,
        cartItems: itemsAfterRemove,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
