import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUser = user_id => dispatch => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .get(`http://localhost:5000/api/user/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_USER_FAILURE, payload: 'Unable to load User' });
    });
};

export const FETCH_TEAMS_START = 'FETCH_TEAMS_START';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';

export const fetchTeams = user_id => dispatch => {
  dispatch({ type: FETCH_TEAMS_START });
  axiosWithAuth()
    .get(`http://localhost:5000/api/teams/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_TEAMS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TEAMS_FAILURE, payload: 'Unable to load user teams.' });
    });
}