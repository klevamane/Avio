import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_REVIEW_CREATE_FAIL,
	PRODUCT_REVIEW_CREATE_REQUEST,
	PRODUCT_REVIEW_CREATE_SUCCESS,
	PRODUCT_TOP_RATED_FAIL,
	PRODUCT_TOP_RATED_REQUEST,
	PRODUCT_TOP_RATED_SUCCESS,
} from '../constants/product.js';

import axios from 'axios';

export const listProducts = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		// this will set the loading state to true and
		// products to empty array
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get(
			process.env.REACT_APP_BASE_URL +
				`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		);

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
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
			process.env.REACT_APP_BASE_URL + `/api/products/${id}`
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

	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });
		await axios.delete(
			process.env.REACT_APP_BASE_URL + `/api/products/admin/delete/${id}`,
			config
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

export const createProduct = () => async (dispatch, getState) => {
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
		dispatch({ type: PRODUCT_CREATE_REQUEST });
		// No data is being sent because the backend
		// automatically creates a generic product
		// when this endpoint is hit
		const { data } = await axios.post(
			process.env.REACT_APP_BASE_URL + `/api/products/admin/create`,
			{},
			config
		);
		// no need for a payload
		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const editProduct = (id, updateData) => async (dispatch, getState) => {
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
		dispatch({ type: PRODUCT_EDIT_REQUEST });
		// No data is being sent because the backend
		// automatically creates a generic product
		// when this endpoint is hit
		const { data } = await axios.patch(
			process.env.REACT_APP_BASE_URL + `/api/products/admin/update/${id}`,
			updateData,
			config
		);
		// no need for a payload
		dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data.product });
	} catch (error) {
		dispatch({
			type: PRODUCT_EDIT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
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
		dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
		await axios.post(
			process.env.REACT_APP_BASE_URL + `/api/reviews/${productId}/create`,
			review,
			config
		);
		// no need for a payload
		dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_REVIEW_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getTopRatedProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_RATED_REQUEST });
		const { data } = await axios.get(
			process.env.REACT_APP_BASE_URL + '/api/products/rated/top-rated'
		);
		// no need for a payload
		dispatch({ type: PRODUCT_TOP_RATED_SUCCESS, payload: data.topRated });
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_RATED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
