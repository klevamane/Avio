import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_GET_ALL_FAIL,
	ORDER_GET_ALL_REQUEST,
	ORDER_GET_ALL_SUCCESS,
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
			process.env.REACT_APP_BASE_URL + '/api/orders',
			order,
			config
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
			process.env.REACT_APP_BASE_URL + `/api/orders/${orderId}`,
			config
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
		dispatch({ type: ORDER_PAY_REQUEST });
		const { data } = await axios.put(
			process.env.REACT_APP_BASE_URL + `/api/orders/${orderId}/pay`,
			paymentResult,
			config
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
			process.env.REACT_APP_BASE_URL + '/api/orders/user/all',
			config
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

export const getAllOrders = () => async (dispatch, getState) => {
	const {
		authLoginInfo: { loggedInUserInfo },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${loggedInUserInfo.user.token}`,
		},
	};

	try {
		dispatch({ type: ORDER_GET_ALL_REQUEST });
		const { data } = await axios.get(
			process.env.REACT_APP_BASE_URL + '/api/orders',
			config
		);

		dispatch({
			type: ORDER_GET_ALL_SUCCESS,
			payload: data.orders,
		});
	} catch (error) {
		dispatch({
			type: ORDER_GET_ALL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
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
		dispatch({ type: ORDER_DELIVER_REQUEST });
		console.log('THE RESULT START');
		const result = await axios.patch(
			process.env.REACT_APP_BASE_URL + `/api/orders/${orderId}/deliver`,
			{}, // pass an empty object since we aren't updating anything
			config
		);
		console.log('THE RESULT', result);

		dispatch({ type: ORDER_DELIVER_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
