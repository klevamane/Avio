import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import productListReducer from './reducers/product.js';
import thunk from 'redux-thunk';

const reducer = combineReducers({ productListReducer });
const middleware = [thunk];

const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
