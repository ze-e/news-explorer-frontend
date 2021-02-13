import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute (props) {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Route />
    ) : (
        <Redirect to={{ pathname: '/' }} />
    );
}