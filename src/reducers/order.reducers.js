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
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_RESET_LIST,
} from '../constants/order.constant';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderGetDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_GET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_GET_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_RESET:
      return {};

    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderGetSingleUserOrdersReducer = (
  state = { orders: [] },
  action,
) => {
  switch (action.type) {
    case ORDER_LIST_SINGLE_USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SINGLE_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };

    case ORDER_RESET_LIST:
      return {
        orders: [],
      };

    case ORDER_LIST_SINGLE_USER_ORDERS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
