import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { WebcamPage } from './views';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'> <WebcamPage /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
