import React from 'react';
import Nav from './components/nav';
import HideAppBar from './components/appbar'

function Dashboard() {
  return (
    <div>
        <HideAppBar/>
        <Nav/>
    </div>
  );
}

export default Dashboard;