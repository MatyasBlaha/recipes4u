import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verified, setVerified] = useState(false)
    const [login, setLogin] = useState(null)
    const [loginMessage, setLoginMessage] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault();

        const dataOTP = {
            verify: verified,
        }
        const configurationOTP = {
            method: "post",
            url: "http://localhost:8080/api/verifyOTP",
            data: dataOTP
        }

        axios(configurationOTP)
            .then((result) => {
                setVerified(true)
                setLoginMessage(result.data.message)
            })
            .catch((error) => {
                new Error()
                setLogin(false)
                console.log(error.message)
                // setLoginMessage("Login wasn't successful")
            })


        const data = {
            email: email,
            password: password
        };


        const confiiguration = {
            method: "post",
            url: "http://localhost:8080/api/login",
            data: data
        };



        axios(confiiguration)
            .then((result) => {
                setLogin(true)
                setLoginMessage(result.data.message)
                cookies.set('token', result.data.token, {
                    path: '/'
                });

                window.location.href = "/Profile"
            })
            .catch((error) => {
                setLogin(false)
                setLoginMessage(error.response.data.message)
            })
    }


    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label htmlFor="emailInput">Email Adress: </label>
                    <input
                        id="emailInput"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        type="email"
                        placeholder="Enter email"/>
                </div>

                <div>
                    <label htmlFor="passwordInput">Password: </label>
                    <input
                        id="passwordInput"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        type="password"
                        placeholder="password"/>
                </div>

                <div>
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}>
                        Submit
                    </button>
                </div>

                {login !== null && (
                    <>
                        {login ? (
                            <p className="text-success">{loginMessage}</p>
                        ) : (
                            <p className="text-danger">{loginMessage}</p>
                        )}
                    </>
                )}

            </form>

            <Link to="/Register">Register</Link>


        </div>
    )
}

export default Login;