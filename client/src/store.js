import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducer,
  productReducer,
  relatedProductsReducer,
  topProductsReducer,
} from './Redux/Products/reducers';
import { cartReducer } from './Redux/Cart/reducers';

const combinedReducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  related: relatedProductsReducer,
  topProducts: topProductsReducer,
  cart: cartReducer,
});

const cartItemsFromStotage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStotage },
};

const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
