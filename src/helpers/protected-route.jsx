import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export const ProtectedRoute = ({ user, children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      if (user) React.cloneElement(children, { user });

      if (!user)
        return (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        );
      return <></>;
    }}
  />
);

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
