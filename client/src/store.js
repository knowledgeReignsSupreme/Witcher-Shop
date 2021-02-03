import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducer,
  productReducer,
  relatedProductsReducer,
  topProductsReducer,
} from './Redux/reducers/productsReducer';

const combinedReducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  related: relatedProductsReducer,
  topProducts: topProductsReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
