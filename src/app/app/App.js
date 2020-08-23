import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Program from '../shows/components/_Page';
import Home from '../home/Home';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/shows'>
          <Program />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
