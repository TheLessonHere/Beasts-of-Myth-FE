import React, { useEffect } from 'react';
import Nav from './components/nav';
import HideAppBar from './components/appbar';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';

function Dashboard(props) {

  useEffect(() => {
    props.fetchUser(props.match.params.user_id)
  }, [])

  return (
    <div>
        <HideAppBar />
        <Nav />
    </div>
  );
}

const mapStateToProps = state => {
  return {
      ...state
  }
}

export default connect(mapStateToProps, { fetchUser })(Dashboard);