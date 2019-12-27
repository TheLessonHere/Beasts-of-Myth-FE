// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import FormikRegister from './views/register';
import FormikLogin from './views/login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './views/dashboard';
// Styling
import './App.css';

function App() {
  return (
    <Router>
      {/* Public Routes */}
      <Route exact path ="/" component={FormikLogin} />
      <Route exact path ="/register" component= {FormikRegister} />
      {/* Private Routes */}
      <PrivateRoute exact path="/dashboard/:user_id" component={Dashboard} />
    </Router>
  );
}

export default App;
