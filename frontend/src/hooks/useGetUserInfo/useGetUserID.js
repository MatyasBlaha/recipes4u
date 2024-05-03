import {jwtDecode} from "jwt-decode"; // Ensure correct import syntax

export const userGetUserID = () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const token = getCookie('token');

    if (typeof token === 'string' && token.trim() !== '') {
        try {
            const decodedToken = jwtDecode(token);
            const userID = decodedToken.userId;
            return userID;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    } else {
        return null;
    }
};

