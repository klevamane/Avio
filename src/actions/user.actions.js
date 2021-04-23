import {
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_GET_ANY_DETAILS_FAIL,
  USER_GET_ANY_DETAILS_REQUEST,
  USER_GET_ANY_DETAILS_SUCCESS,
  USER_UPDATE_ANY_DETAILS_FAIL,
  USER_UPDATE_ANY_DETAILS_REQUEST,
  USER_UPDATE_ANY_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/user.constants';

import axios from 'axios';

export const getUserDetails = () => async (dispatch, getState) => {
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
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      'http://localhost:5000/api/users/profile',
      config,
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.profile });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
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
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put(
      'http://localhost:5000/api/users/profile',
      user,
      config,
    );

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data.profile });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const usersList = () => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };

  try {
    dispatch({ type: USERS_LIST_REQUEST });
    const { data } = await axios.get('http://localhost:5000/api/users', config);
    dispatch({ type: USERS_LIST_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  console.log('HAPPENING IN ACTION');
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };

  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      config,
    );
    // no need for a payload
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAnyUser = (id) => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };

  try {
    dispatch({ type: USER_GET_ANY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/users/admin/single/${id}`,
      config,
    );
    // no need for a payload
    dispatch({ type: USER_GET_ANY_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_GET_ANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAnyUser = (id, updateData) => async (dispatch, getState) => {
  const {
    authLoginInfo: { loggedInUserInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedInUserInfo.user.token}`,
    },
  };

  try {
    dispatch({ type: USER_UPDATE_ANY_DETAILS_REQUEST });
    await axios.put(
      `http://localhost:5000/api/users/admin/update/${id}`,
      updateData,
      config,
    );
    // no need for a payload
    dispatch({ type: USER_UPDATE_ANY_DETAILS_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
