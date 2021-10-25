import { connect } from 'react-redux'
import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = ({ authedUser, children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() =>
        authedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);
