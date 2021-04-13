import { applyMiddleware, combineReducers, createStore } from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/product';

import { cartReducer } from './reducers/cart.reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { userLoginReducer } from './reducers/user.reducers';

console.log('WELCOME TO THE STORE');
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});
const middleware = [thunkMiddleware];

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  userInfo: userInfoFromStorage,
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
