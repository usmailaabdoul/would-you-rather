import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css'
import { connect } from 'react-redux'
import { 
  Home, 
  Login, 
  NewQuestion, 
  LeaderBoard, 
  Page404, 
  Questions 
} from './containers';
import { NavBar } from './components';
import LoadingBar from 'react-redux-loading';
import { getData } from './redux/actions/shared';
import PrivateRoute from './utils/PrivateRoute';

const App = ({ getData }) => {
  useEffect(() => {
    getData()
  }, [getData]);

  return (
    <div className="app">
      <Router>
        <NavBar />
        <LoadingBar />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/questions/:id" component={Questions} />
            <PrivateRoute exact path="/add" component={NewQuestion} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={Page404}/>
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
export default connect(mapStateToProps, { getData })(App)
