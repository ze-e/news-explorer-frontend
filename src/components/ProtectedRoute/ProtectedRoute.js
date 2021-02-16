import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path}>
      {
        () => props.loggedIn ? props.children : <Redirect to='/' />
      }
    </Route>
)}

export default ProtectedRoute;