import { React, useState, useEffect } from 'react';
import iconEdit from '../../assets/icons/icon_edit.png'

import {styled} from "styled-components";
import {LinkButton, DivFlexColumn} from "../../assets/styles/global"
import axios from "axios";

export const Icon = styled.img`
    height: 15px;
`
const ProfileOverview = () => {


    const [passwordMessage, setPasswordMessage] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');



    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];

        axios.get('http://localhost:8080/api/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserData(response.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])



    const handleEmailChange = (e) => setEmail(e.target.value);

    const forgotPassword =(e) => {
        e.preventDefault()
        try{
            if(!email){
                setPasswordMessage("Email is required")
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
                        setPasswordMessage(result.data.message)
                    })
                    .catch((err) => {
                        setPasswordMessage(err.response.data.message)
                    })

            }
        } catch(err) {
            setPasswordMessage(err.message)
        }
    }



    return (
        <div>
            <div>
                {userData && (
                    <div>
                        <p>Jmeno: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                )}
            </div>

            <div>
                <span>password</span>
                <LinkButton onClick={() => setShowEmailInput(true)}>
                    <span>zmenit heslo</span>
                    <Icon src={iconEdit} alt="edit"/>
                </LinkButton>
                {showEmailInput && ( // This conditionally renders the email input field
                    <form onSubmit={forgotPassword}>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
                <p>{passwordMessage}</p>
            </div>
        </div>
    )
}

export default ProfileOverview