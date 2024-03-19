import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';

import axios from 'axios';
import './App.css';

import AutoLogoutWrapper from "./components/AutoLogoutWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

import Main from './pages/Main';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';

import Navbar from './components/Navbar';

import Cookies from 'universal-cookie';
const cookies = new Cookies();




function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = cookies.get('token')
        let auth = {'token': token}
        auth.token !== undefined ? setIsAuthenticated(true) : setIsAuthenticated(false)
    })


    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated}/>

            <AutoLogoutWrapper>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route exact path="/Login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Profile/>} path="/Profile" exact/>
                    </Route>
                </Routes>
            </AutoLogoutWrapper>

        </div>
    );
}


export default App;
