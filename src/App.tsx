import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Login from './components/login/Container';
import Signup from './components/signup/Container';
import Write from './components/write/Container';
import Quiz from './components/quiz/Container';
import QuizDetail from './components/quizDetail/Container';
import Info from './components/info/Container';
import Chat from './components/chat/Container';
import ChatList from './components/chatList/Container';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" component={Navigation} />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/write" component={Write} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/quiz/:idx" component={QuizDetail} />
            <Route exact path="/info" component={Info} />
            <Route exact path="/chat/:id" component={Chat} />
            <Route exact path="/chat" component={ChatList} />
          </Switch>
        </Router>

      </BrowserRouter>
    </>
  );
}

export default App;
