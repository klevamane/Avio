import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/product';

import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    // this will set the loading state to true and
    // products to empty array
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('localhost:5000/api/products');
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: data });
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
