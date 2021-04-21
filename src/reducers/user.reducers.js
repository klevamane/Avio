import {
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_RESET,
  USERS_LIST_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/user.constants';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { ...state, loading: true };

    case USERS_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case USERS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USERS_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};
