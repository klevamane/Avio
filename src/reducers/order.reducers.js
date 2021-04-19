import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_DETAILS_FAIL,
  ORDER_GET_DETAILS_REQUEST,
  ORDER_GET_DETAILS_SUCCESS,
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
