import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css'
import { connect } from 'react-redux'
import { Home, Login, Results, NewQuestion, Answer, LeaderBoard } from './containers';
import { NavBar } from './components';
import LoadingBar from 'react-redux-loading';

const App = ({ authedUser }) => {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <LoadingBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {!authedUser ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route path="/questions/:id" component={Results} />
            <Route path="/answer/:id" component={Answer} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={LeaderBoard} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}
export default connect(mapStateToProps, null)(App)
