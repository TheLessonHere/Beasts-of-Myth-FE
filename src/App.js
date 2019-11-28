// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import Dashboard from './views/dashboard';
// Styling
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
    </Router>
  );
}

export default App;
