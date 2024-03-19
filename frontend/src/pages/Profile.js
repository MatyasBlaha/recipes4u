import react from 'react';
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Profile = () => {

    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        window.location.href = "/";
    }

    return (
        <div>
            <h1 className="text-center">Profile Component</h1>
            <button onClick={() => handleLogout()}>logout</button>
        </div>
    )
}

export default Profile;