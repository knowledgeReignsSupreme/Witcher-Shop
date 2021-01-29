import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer } from './Redux/reducers/productsReducer';

const combinedReducers = combineReducers({
  products: productsReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
