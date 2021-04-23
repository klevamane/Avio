import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_DETAILS_FAIL,
  ORDER_GET_DETAILS_REQUEST,
  ORDER_GET_DETAILS_SUCCESS,
  ORDER_LIST_SINGLE_USER_ORDERS_FAIL,
  ORDER_LIST_SINGLE_USER_ORDERS_REQUEST,
  ORDER_LIST_SINGLE_USER_ORDERS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/order.constant';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post(
      'http://localhost:5000/api/orders',
      order,
      config,
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };
  try {
    dispatch({ type: ORDER_GET_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${orderId}`,
      config,
    );

    dispatch({ type: ORDER_GET_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_GET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSingleUserOrders = () => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };

  try {
    dispatch({ type: ORDER_LIST_SINGLE_USER_ORDERS_REQUEST });
    const { data } = await axios.get(
      'http://localhost:5000/api/orders/user/all',
      config,
    );

    dispatch({
      type: ORDER_LIST_SINGLE_USER_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_SINGLE_USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
