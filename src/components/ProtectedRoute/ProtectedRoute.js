import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path}>
      {
        () => localStorage.getItem('token') ? props.children : <Redirect to='/' />
      }
    </Route>
)}

export default ProtectedRoute;