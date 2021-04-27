import {
	USERS_LIST_RESET,
	USER_DETAILS_RESET,
} from '../constants/user.constants';
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_SIGNUP_FAIL,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
} from '../constants/auth.constants';

import { ORDER_RESET_LIST } from '../constants/order.constant';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'http://localhost:5000/api/auth/login',
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('loggedInUserInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signup = (email, password, name) => async (dispatch) => {
	try {
		dispatch({ type: USER_SIGNUP_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'http://localhost:5000/api/auth/signup',
			{ email, password, name },
			config
		);

		dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

		// We also want to immediately log the user in
		// upon registration
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		// save logged in user data to local storage
		localStorage.setItem('loggedInUserInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNUP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('loggedInUserInfo');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: ORDER_RESET_LIST });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: USERS_LIST_RESET });
};
