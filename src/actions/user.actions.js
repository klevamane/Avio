import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
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
      'http://localhost:5000/api/user/profile',
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
      'http://localhost:5000/api/user/profile',
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
