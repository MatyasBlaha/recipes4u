import React, {useState, useEffect } from 'react';
import { useNavigate,  useLocation } from 'react-router-dom'
import axios from "../../services/axiosConfig";

import {DivFlex, LinkButton, PrimaryLink} from "../../assets/styles/global"


const VerifyEmail = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [sentOTPOnEmail, setSentOTPOnEmail] = useState(null)




    let location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!userId) {
            console.log("User ID not available. Please provide a valid user ID.");
        } else {
            console.log("User ID:", userId);
        }
    }, [userId]);




    const verifyOTP = (e) => {
        e.preventDefault();

        console.log(userId)

        if (!userId) {
            alert("User ID not available. Please register first.");
            return;
        }

        const dataOTP = {
            userId: userId,
            otp: verified,
        }

        console.log(dataOTP)

        const configurationOTP = {
            method: "post",
            url: "/api/verifyOTP",
            data: dataOTP
        };



        axios(configurationOTP)
            .then((result) => {
                setRegisterMessage(result.data.message)
            })
            .catch((error) => {
                setRegisterMessage(error.message)
            });
    }



    return (
        <div style={{paddingTop: "100px", height: "500px"}}>
            <h1>Email Verification</h1>
            <DivFlex>
                <form onSubmit={(e) => verifyOTP(e)}>
                    <label htmlFor="code">Enter verification code:</label><br/>
                    <input type="text" pattern="[0-9]{4}" required
                           onChange={(e) => setVerified(e.target.value)}/>
                    <input type="hidden" name="userId" value="{{userId}}"/>
                    <input type="submit" value="Verify"/>
                </form>
                <PrimaryLink to="/Login">Login</PrimaryLink>
            </DivFlex>
            <p>{registerMessage}</p>
        </div>
    )
}

export default VerifyEmail;