import React, {useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from "../../services/axiosConfig";

import PasswordValidation from "../../utils/PasswordValidation";


const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);


    let location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get('resetToken');

    console.log(resetToken)
    const handleSubmit = (e) => {
        e.preventDefault()

        // PASSWORD VALIDATION
        const validationMessage = PasswordValidation(password);
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }

        if(password !== confirmPassword){
            setErrorMessage("Hesla se neshoduji")
            return;
        }

        const data = {
            resetToken: resetToken,
            newPassword: password
        }

        const configuration = {
            method: "post",
            url: "/api/resetPassword",
            data: data
        }

        axios(configuration)
            .then((result) => {
                setMessage(result.data.message)
            })
            .catch((err) => {
                setMessage(err.message)
            })

    }



    return (
        <div style={{paddingTop: "100px", height: "500px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Set new password</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>

            <p>{message}</p>
        </div>
    )
}

export default ResetPassword;