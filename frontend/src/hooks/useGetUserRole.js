import {jwtDecode} from "jwt-decode";

export const useGetUserRole = () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const role = getCookie('role');


    if (typeof role ==='string' && role.trim() !== '') {
        try {
            const decodedToken = jwtDecode(role);
            const userRole = decodedToken.userRole;
            return userRole;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    } else {
        return null;
    }
}