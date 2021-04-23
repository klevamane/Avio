import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/product.js';

import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    // this will set the loading state to true and
    // products to empty array
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('http://localhost:5000/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    // this will set the loading state to true and
    // products to empty array
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`,
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };
  console.log('HERE');

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await axios.delete(
      `http://localhost:5000/api/products/admin/delete/${id}`,
      config,
    );
    // no need for a payload
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
