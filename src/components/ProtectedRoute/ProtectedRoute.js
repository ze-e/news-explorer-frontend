import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path}>
      {
        () => localStorage.getItem('cards') ? props.children : <Redirect to='/' />
      }
    </Route>
)}

export default ProtectedRoute;