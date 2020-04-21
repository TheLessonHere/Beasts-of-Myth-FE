import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_TEAMS_START,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
    POST_TEAM_START,
    POST_TEAM_SUCCESS,
    POST_TEAM_FAILURE,
    DELETE_TEAM_START,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAILURE,
    CREATE_TEAM_OBJECTS_START,
    CREATE_TEAM_OBJECTS_SUCCESS,
    CREATE_TEAM_OBJECTS_FAILURE
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
    team_objects: [],
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
        };
      case DELETE_TEAM_START:
        return {
          ...state,
          error: '',
          isFetching: true
        };
      case DELETE_TEAM_SUCCESS:
        const userTeams = state.user_teams.filter(team => team.team_id !== action.payload)
        console.log(userTeams)
        return {
          ...state,
          user_teams: userTeams,
          isFetching: false,
        };
      case DELETE_TEAM_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case CREATE_TEAM_OBJECTS_START:
        return {
          ...state,
          error: '',
          isFetching: true,
        };
      case CREATE_TEAM_OBJECTS_SUCCESS:
        return {
          ...state,
          team_objects: action.payload,
          isFetching: false
        };
      case CREATE_TEAM_OBJECTS_FAILURE:
        return {
          ...state,
          team_objects: [],
          isFetching: false,
          error: action.payload
        };
      default:
        return state;
    }
  };