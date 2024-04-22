import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from "axios";


const ProtectedRoute = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/auth-endpoint");

                const isAuthenticated = response.data.message

                if (isAuthenticated === 'You are authenticated') {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (auth) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
