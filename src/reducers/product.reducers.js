import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_RESET,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
} from '../constants/product.js';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      const { pages, page, products } = action.payload;
      return {
        ...state,
        loading: false,
        products: products,
        page: page,
        pages: pages,
      };

    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action,
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, product: {} };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { success: false, loading: false },
  action,
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, success: false };

    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, success: false };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true, success: false };

    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };

    case PRODUCT_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case PRODUCT_EDIT_RESET:
      return {
        product: {},
        success: false,
      };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { ...state, loading: true, success: false };

    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case PRODUCT_REVIEW_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_RATED_REQUEST:
      return { ...state, loading: true, success: false, products: [] };

    case PRODUCT_TOP_RATED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: action.payload,
      };

    case PRODUCT_TOP_RATED_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
