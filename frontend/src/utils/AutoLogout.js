import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {userGetUserID} from "../hooks/useGetUserID";

const cookies = new Cookies();

const AutoLogout = ({ children }) => {
    const [logoutTimer, setLogoutTimer] = useState(null);
    const navigate = useNavigate();
    const userID = userGetUserID();

    useEffect(() => {
        const timer = setTimeout(() => {
            logout();
        }, 60 * 60 * 1000);

        window.addEventListener('mousemove', resetLogoutTimer);
        window.addEventListener('keypress', resetLogoutTimer);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetLogoutTimer);
            window.removeEventListener('keypress', resetLogoutTimer);
        };
    }, []);

    const resetLogoutTimer = () => {
        clearTimeout(logoutTimer);
        const newTimer = setTimeout(() => {
            if (userID) {
                logout();
            }
        }, 60 * 60 * 1000);
        setLogoutTimer(newTimer);
    };

    const logout = () => {
        if (userID) {
            cookies.remove("token", { path: "/" });
            cookies.remove("role");
            navigate("/Login");
            window.location.reload();
        }
    };

    return <>{children}</>;
};

export default AutoLogout;
