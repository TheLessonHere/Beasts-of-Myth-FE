import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_TEAMS_START,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
    POST_TEAM_START,
    POST_TEAM_SUCCESS,
    POST_TEAM_FAILURE
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
    user_teams: [],
    last_created_team: ''
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
          id: action.payload.user_id,
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
      case FETCH_TEAMS_START:
        return {
          ...state,
          error: '',
          isFetching: true
        };
      case FETCH_TEAMS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: '',
          user_teams: action.payload
        };
      case FETCH_TEAMS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case POST_TEAM_START:
        return {
          ...state,
          error: '',
          isFetching: true
        };
      case POST_TEAM_SUCCESS:
        return {
          ...state,
          last_created_team: action.payload,
          isFetching: false,
        };
      case POST_TEAM_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        }
      default:
        return state;
    }
  };