import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Nav from './components/nav';
import HideAppBar from './components/appbar'

function Dashboard(props) {
  const [account, setAccount] = useState({});

  useEffect(() => {
    axiosWithAuth()
    .get(`http://localhost:5000/api/user/${props.match.params.user_id}`)
    .then(res => {
      setAccount({ user_id: res.data.user_id,
                   username: res.data.username,
                   profile_img: res.data.profile_img,
                   wins: res.data.wins,
                   losses: res.data.losses,
                   connections: res.data.connections});
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  console.log(account);

  return (
    <div>
        <HideAppBar />
        <Nav accountData={account} />
    </div>
  );
}

export default Dashboard;