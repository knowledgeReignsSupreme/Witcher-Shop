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
import { userLoginReducer, userRegisterReducer } from './Redux/User/reducers';

const combinedReducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  related: relatedProductsReducer,
  topProducts: topProductsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStotage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const loggedUserFromStorage = localStorage.getItem('loggedUser')
  ? JSON.parse(localStorage.getItem('loggedUser'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStotage },
  userLogin: { loggedUser: loggedUserFromStorage },
};

const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
