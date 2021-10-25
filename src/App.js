import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css'
import { connect } from 'react-redux'
import { Home, Login, Results, NewQuestion, Answer, LeaderBoard, Page404 } from './containers';
import { NavBar } from './components';
import LoadingBar from 'react-redux-loading';
import { getInitialData } from './redux/actions/shared';
import PrivateRoute from './utils/PrivateRoute';

const App = ({ getInitialData }) => {
  useEffect(() => {
    getInitialData()
  }, [getInitialData]);

  return (
    <div className="app">
      <Router>
        <NavBar />
        <LoadingBar />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/questions/:id">
              <Answer />
            </PrivateRoute>
            <PrivateRoute path="/answer/:id">
              <Results />
            </PrivateRoute>
            <PrivateRoute path="/add">
              <NewQuestion />
            </PrivateRoute>
            <PrivateRoute path="/leaderboard">
              <LeaderBoard />
            </PrivateRoute>
            <Route path="/login" component={Login} />
            {/* <Route component={Page404}/> */}

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
export default connect(mapStateToProps, { getInitialData })(App)
