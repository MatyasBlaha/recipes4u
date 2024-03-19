import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const [registerMessage, setRegisterMessage] = useState("")

    const [userId, setUserId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sentOTPOnEmail, setSentOTPOnEmail] = useState(null)
    const [verified, setVerified] = useState(false);
    const [register, setRegister] = useState(null);




    const handleSubmit = (e) => {
        e.preventDefault();


        const data = {
            name: name,
            email: email,
            password: password
        };

        const configuration = {
            method: "post",
            url: "http://localhost:8080/api/register",
            data: data
        };

        axios(configuration)
            .then((result) => {
                setRegisterMessage(result)
                setSentOTPOnEmail(true)
                setUserId(result.data.data.userId)
            })
            .catch((error) => {
                setSentOTPOnEmail(false)
                setRegisterMessage(error.response.data.message)
            });
    };


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
            url: "http://localhost:8080/api/verifyOTP",
            data: dataOTP
        };



        axios(configurationOTP)
            .then((result) => {
                const message = result.data.message
                alert(message)
                setRegister(true)
            })
            .catch((error) => {
                alert("OTP verification failed. Please try again")
                new Error()
                setRegister(false)
                console.log(error.message)
            });
    }



    return (
        <div>

            <h2>Register</h2>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label htmlFor="usernameInput">Username: </label>
                    <input
                        id="usernameInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="user"
                        placeholder="Enter your username"/>
                </div>

                <div>
                    <label htmlFor="emailInput">Email Adress: </label>
                    <input
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Enter email"/>
                </div>

                <div>
                    <label htmlFor="passwordInput">Password: </label>
                    <input
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="password"/>
                </div>

                <button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>

                {sentOTPOnEmail !== null && (
                    <>
                        {sentOTPOnEmail? (
                            <div>
                                <form onSubmit={(e) => verifyOTP(e)}>
                                    <input type="text" pattern="[0-9]{4}" required onChange={(e) => setVerified(e.target.value)}/>
                                    <button type="submit" onClick={(e) => verifyOTP(e)}>verification</button>
                                </form>
                            </div>
                        ) : (
                            <p className="text-danger">{registerMessage}</p>
                        )}
                    </>
                )}

                {register !== null && (
                    <>
                        {register ? (
                            <p className="text-success">{registerMessage}</p>
                        ) : (
                            <p className="text-danger">{registerMessage}</p>
                        )}
                    </>
                )}

            </form>


            <Link to="/Login">Login</Link>
        </div>
    )
}

export default Register;