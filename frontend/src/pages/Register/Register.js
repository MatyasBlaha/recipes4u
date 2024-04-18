import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


// UTILS
import PasswordValidation from '../../utils/PasswordValidation'

import {
    LoginWrapper,
    PrimaryLink,
    ContentWrapper,
    ContentCenter,
    DivFlexSpaceBetween,
    PrimarySpan,
    DarkButton,
    Input,
    DivFlex,
    LoginContainer,
    LoginSideContainer,
    LoginSideContentContainer,
    LoginFormWrapper,
    Form,
    LoginFormContainer,
    LoginFormInputs,
    LabelContainer,
} from "../../assets/styles/global"

const Register = () => {

    const [message, setMessage] = useState("");

    const [userId, setUserId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sentOTPOnEmail, setSentOTPOnEmail] = useState(null)




// SUBMIT REGISTER FORM DATA'S //
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,
            email: email,
            password: password
        };

        // PASSWORD VALIDATION
        const validationMessage = PasswordValidation(password);
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }


        const configuration = {
            method: "post",
            url: "http://localhost:8080/api/register",
            data: data
        };

        axios(configuration)
            .then((result) => {
                setSentOTPOnEmail(true)
                setUserId(result.data.data.userId)
                setMessage(result.data.message)
            })
            .catch((error) => {
                setSentOTPOnEmail(false)
                setMessage(error.response.data.message)
            });
    };





    const resendOTP = () => {
        const data = {
            userId: userId,
            email: email
        };

        const configuration = {
            method: "post",
            url: "http://localhost:8080/api/resendOTPVerify",
            data: data
        };

        console.log(data)
        setSentOTPOnEmail(null)
        axios(configuration)
            .then((result) => {
                setSentOTPOnEmail(true)
                setMessage(result.data.message)
            })
            .catch((error) => {
                console.error(error);
            });
    };





    return (
       <LoginWrapper>
           <ContentWrapper>
               <ContentCenter>
                   <LoginContainer>

                           <LoginSideContainer>
                               <LoginSideContentContainer>
                                   <h4>Already have an <PrimarySpan>account</PrimarySpan>?</h4>
                                   <p>"be part of the new generation of modern cooking"</p>
                                   <PrimaryLink to="/Login">Login</PrimaryLink>
                               </LoginSideContentContainer>
                           </LoginSideContainer>


                           <LoginFormWrapper>
                               <p>{message}</p>
                               <Form onSubmit={(e) => handleSubmit(e)}>
                                   <LoginFormContainer>
                                       <LoginFormInputs>
                                           <LabelContainer>
                                               <label htmlFor="usernameInput">Username: </label>
                                               <Input
                                                   id="usernameInput"
                                                   value={name}
                                                   onChange={(e) => setName(e.target.value)}
                                                   type="text"
                                                   name="user"
                                                   placeholder="Enter your username"/>
                                           </LabelContainer>

                                           <LabelContainer>
                                               <label htmlFor="emailInput">Email Adress: </label>
                                               <Input
                                                   id="emailInput"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}
                                                   type="email"
                                                   name="email"
                                                   placeholder="Enter email"/>
                                           </LabelContainer>

                                           <LabelContainer>
                                               <label htmlFor="passwordInput">Password: </label>
                                               <Input
                                                   id="passwordInput"
                                                   value={password}
                                                   onChange={(e) => setPassword(e.target.value)}
                                                   type="password"
                                                   name="password"
                                                   placeholder="password"/>
                                           </LabelContainer>


                                       </LoginFormInputs>


                                       <DivFlex>
                                           <DarkButton
                                               variant="primary"
                                               type="submit"
                                               onClick={(e) => handleSubmit(e)}>
                                               Submit
                                           </DarkButton>

                                           {sentOTPOnEmail ? (
                                               <button onClick={(e) => resendOTP(e)}>Resend OTP</button>
                                           ) : null
                                           }
                                       </DivFlex>
                                   </LoginFormContainer>
                               </Form>
                           </LoginFormWrapper>
                   </LoginContainer>
               </ContentCenter>
           </ContentWrapper>
       </LoginWrapper>
    )
}

export default Register;