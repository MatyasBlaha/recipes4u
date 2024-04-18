import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie'
import {styled} from "styled-components";

import {
    LoginWrapper,
    PrimaryLink,
    DivFlexColumn,
    ContentWrapper,
    ContentCenter,
    DivFlexSpaceBetween,
    PrimarySpan,
    DarkButton,
    DarkButtonSmall,
    DangerButtonSmall,
    Input, DivFlex,
    LoginContainer,
    LoginSideContainer,
    LoginSideContentContainer,
    LoginFormWrapper,
    Form,
    LoginFormContainer,
    LoginFormInputs,
    LabelContainer,
    DangerButtonClose
} from "../../assets/styles/global"

const cookies = new Cookies();








const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verified, setVerified] = useState(false)
    const [login, setLogin] = useState(null)
    const [loginMessage, setLoginMessage] = useState("")
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);


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
            })
            .catch((err) => {
                new Error()
                setLogin(false)
                console.log(err.message)
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
                cookies.set('token', result.data.token, {
                    path: '/'
                });
                cookies.set('role', result.data.role, {
                    path: '/'
                })

                window.location.href = "/Profile"
                const configuration2 = {
                    method: "get",
                    url: "http://localhost:8080/api/auth-endpoint"
                }
                axios(configuration2)
                    .then((result) => {
                        setLogin(true)
                        setLoginMessage(result.data.message)
                    })
                    .catch((error) => {
                        setLogin(false)
                        setLoginMessage(error.message)
                        const logout = () => {
                            cookies.remove("token", { path: "/" });
                            window.location.reload();
                        };
                        logout()
                    })

            })
            .catch((err) => {
                setLogin(false)
                setLoginMessage(err.response.data.message)
            })
    }



    const handleForgotPassword =(e) => {
        e.preventDefault()
        try{
            if(!email){
                setLoginMessage("Email is required")
            } else {

                const data = {
                    email: email
                }

                const configuration = {
                    method: "post",
                    url: "http://localhost:8080/api/forgotPassword",
                    data: data
                }

                axios(configuration)
                    .then((result) => {
                        setLoginMessage(result.data.message)
                    })
                    .catch((err) => {
                        setLoginMessage(err.response.data.message)
                    })

            }
        } catch(err) {
            setLoginMessage(err.message)
        }
    }


    return (
            <LoginWrapper>
                <ContentWrapper>
                    <ContentCenter>
                        <LoginContainer>

                                <LoginSideContainer>
                                    <LoginSideContentContainer>
                                        <h4>Create a new <PrimarySpan>account</PrimarySpan> today!</h4>
                                        <p>"be part of the new generation of modern cooking"</p>
                                        <PrimaryLink to="/Register">Register</PrimaryLink>
                                    </LoginSideContentContainer>
                                </LoginSideContainer>

                                <LoginFormWrapper>
                                    <p>{loginMessage}</p>
                                    <Form onSubmit={(e) => handleSubmit(e)}>

                                        <LoginFormContainer>
                                            <LoginFormInputs>
                                                <LabelContainer>
                                                    <label htmlFor="emailInput">Email Adress: </label>
                                                    <Input
                                                        id="emailInput"
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)
                                                        }}
                                                        type="email"
                                                        placeholder="Enter email"/>
                                                </LabelContainer>

                                                <LabelContainer>
                                                    <label htmlFor="passwordInput">Password: </label>
                                                    <Input
                                                        id="passwordInput"
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                        placeholder="password"
                                                    />
                                                </LabelContainer>

                                                <div>
                                                    <DarkButtonSmall type="button" onClick={() => setForgotPasswordVisible(true)}>
                                                        <p>forgot password</p>
                                                    </DarkButtonSmall>
                                                </div>
                                                {forgotPasswordVisible &&
                                                    <div>
                                                        <LabelContainer>
                                                            <label htmlFor="forgotPasswordInput">Enter your email address</label>
                                                            <Input
                                                                id="forgotPasswordInput"
                                                                type="email"
                                                                placeholder="Enter email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </LabelContainer>
                                                        <DivFlex>
                                                            <DarkButtonSmall type="submit" onClick={(e) => handleForgotPassword(e)}>Reset
                                                                Password
                                                            </DarkButtonSmall>
                                                            <DangerButtonClose type="button" onClick={() => setForgotPasswordVisible(false)}>
                                                                Close
                                                            </DangerButtonClose>
                                                        </DivFlex>
                                                    </div>
                                                }
                                            </LoginFormInputs>


                                            <div>
                                                <DarkButton
                                                    to="/"
                                                    type="submit"
                                                    onClick={(e) => handleSubmit(e)}>
                                                    Login
                                                </DarkButton>
                                            </div>
                                        </LoginFormContainer>


                                    </Form>
                                </LoginFormWrapper>

                        </LoginContainer>
                    </ContentCenter>
                </ContentWrapper>
            </LoginWrapper>
    )
}

export default Login;