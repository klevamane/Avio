import { applyMiddleware, combineReducers, createStore } from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/product';

import { authLoginReducer } from './reducers/auth.reducers';
import { cartReducer } from './reducers/cart.reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  authLoginInfo: authLoginReducer,
});
const middleware = [thunkMiddleware];

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const authLoginInfoFromStorage = localStorage.getItem('loginUserInfo')
  ? JSON.parse(localStorage.getItem('loginUserInfo'))
  : {};

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  authLoginInfo: authLoginInfoFromStorage,
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
