import React, {useEffect, useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const PrivateRoute = () => {

    const isAuthenticated = cookies.get('token')

        let auth = {'token': isAuthenticated}

    return (
        auth.token !== undefined ? <Outlet/> : <Navigate to="/login" />
    )
};

export default PrivateRoute;
