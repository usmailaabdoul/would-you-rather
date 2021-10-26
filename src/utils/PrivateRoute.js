import { connect } from 'react-redux'
import {
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

const PrivateRoute = ({ authedUser, component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        authedUser ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location.pathname}
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
