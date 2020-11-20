import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Login from './components/login/Container';
import Write from './components/write/Container';
import Quiz from './components/quiz/Container';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" component={Navigation} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/write" component={Write} />
            <Route exact path="/quiz" component={Quiz} />
          </Switch>
        </Router>

      </BrowserRouter>
    </>
  );
}

export default App;
