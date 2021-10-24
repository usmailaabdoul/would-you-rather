import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css'
import { connect } from 'react-redux'
import { Home, Login, Results, NewQuestion } from './containers';
import { NavBar } from './components';

const App = ({ authedUser }) => {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {!authedUser ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route path="/results/:id" component={Results} />
            <Route path="/newQuestion" component={NewQuestion} />
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
