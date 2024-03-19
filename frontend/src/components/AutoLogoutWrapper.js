import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AutoLogoutWrapper = ({ children }) => {
    const [logoutTimer, setLogoutTimer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            logout();
        }, 15 * 60 * 1000);

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
            logout();
        }, 15 * 60 * 1000);
        setLogoutTimer(newTimer);
    };

    const logout = () => {
        cookies.remove("token", { path: "/" });
        navigate("/Login");
        window.location.reload();
    };

    return <>{children}</>;
};

export default AutoLogoutWrapper;
