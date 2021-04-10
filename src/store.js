import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import productListReducer from './reducers/product';
import thunkMiddleware from 'redux-thunk';

console.log('WELCOME TO THE STORE');
const rootReducer = combineReducers({ productList: productListReducer });
const middleware = [thunkMiddleware];

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
