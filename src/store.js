import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authLoginReducer, authSignupReducer } from './reducers/auth.reducers';
import {
  orderCreateReducer,
  orderGetDetailsReducer,
  orderGetSingleUserOrdersReducer,
  orderPayReducer,
} from './reducers/order.reducers';
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
} from './reducers/product';
import {
  userDetailsReducer,
  userUpdateProfileReducer,
  usersDeleteReducer,
  usersGetAnyReducer,
  usersListReducer,
  usersUpdateAnyReducer,
} from './reducers/user.reducers';

import { cartReducer } from './reducers/cart.reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  authLoginInfo: authLoginReducer,
  authSignupInfo: authSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderGetDetailsReducer,
  orderPay: orderPayReducer,
  orderSingleUserOrders: orderGetSingleUserOrdersReducer,
  usersList: usersListReducer,
  userDelete: usersDeleteReducer,
  userGetAnyUser: usersGetAnyReducer,
  updateAnyUser: usersUpdateAnyReducer,
});
const middleware = [thunkMiddleware];

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const authLoginInfoFromStorage = localStorage.getItem('loggedInUserInfo')
  ? { loggedInUserInfo: JSON.parse(localStorage.getItem('loggedInUserInfo')) }
  : {};

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? { shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) }
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  authLoginInfo: authLoginInfoFromStorage,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
