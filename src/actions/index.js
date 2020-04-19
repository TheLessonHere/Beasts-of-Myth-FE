import { axiosWithAuth } from '../utils/functions/axiosWithAuth';

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUser = user_id => dispatch => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .get(`http://localhost:8000/api/user/${user_id}`)
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

export const fetchTeams = (user_id) => dispatch => {
  dispatch({ type: FETCH_TEAMS_START });
  axiosWithAuth()
    .get(`http://localhost:8000/api/teams/${user_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_TEAMS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TEAMS_FAILURE, payload: 'Unable to load user teams.' });
    });
}

export const POST_TEAM_START = 'POST_TEAM_START';
export const POST_TEAM_SUCCESS = 'POST_TEAM_SUCCESS';
export const POST_TEAM_FAILURE = 'POST_TEAM_FAILURE';

export const postTeam = (user_id, teamDatastring) => dispatch => {
  dispatch({ type: POST_TEAM_START });
  const teamDS = JSON.stringify({ team_datastring: teamDatastring });
  axiosWithAuth()
    .post(`http://localhost:8000/api/teams/${user_id}`, teamDS)
    .then(res => {
      console.log(res);
      dispatch({ type: POST_TEAM_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_TEAM_FAILURE, payload: 'Unable to save team.' });
    });
}

export const DELETE_TEAM_START = 'DELETE_TEAM_START';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

export const deleteTeam = (team_id) => dispatch => {
  dispatch({ type: DELETE_TEAM_START });
  axiosWithAuth()
    .delete(`http://localhost:8000/api/teams/${team_id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_TEAM_SUCCESS, payload: team_id });
    })
    .catch(err => {
      dispatch({ type: DELETE_TEAM_FAILURE, payload: 'Unable to delete team.' });
    });
}