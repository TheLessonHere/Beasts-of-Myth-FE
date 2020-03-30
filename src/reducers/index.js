import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
  } from '../actions';

const initialState = {
    isFetching: false,
    error: '',
    id: '',
    username: '',
    profile_img: '',
    wins: '',
    losses: '',
    connections: [],
  };

export const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case FETCH_USER_START:
        return {
          ...state,
          error: '',
          isFetching: true
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: '',
          id: action.payload.id,
          username: action.payload.username,
          profile_img: action.payload.profile_img,
          wins: action.payload.wins,
          losses: action.payload.losses,
          connections: action.payload.connections
        };
      case FETCH_USER_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      default:
        return state;
    }
  };