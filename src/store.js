import { applyMiddleware, combineReducers, createStore } from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/product';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

console.log('WELCOME TO THE STORE');
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
const middleware = [thunkMiddleware];

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
