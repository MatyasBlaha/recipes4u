import React, { useEffect, useState } from 'react';
import { Routes, Route,} from 'react-router-dom';


import {ThemeProvider, styled} from "styled-components";
import {lightTheme, GlobalStyle} from "./styles/theme"
import {ContentContainer} from "./assets/styles/global";

import axios from 'axios';
import './App.css';

import AutoLogout from "./utils/AutoLogout";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from './pages/Home/Home/Home';
import Profile from './pages/Profile/Profile/Profile';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import Cookies from 'universal-cookie';
import RecipeDetails from "./pages/Home/RecipeDetails";
import {DivFlex, DivFlexSpaceBetween, LinkButton} from "./assets/styles/global";



const cookies = new Cookies();





// ********* STYLES **************** //
const Label = styled.label `
    position: relative;
    display: inline-block;
    width: 50px;
    height: 20px;
    margin-left: 20px;
`

const Input = styled.input `
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + :before {
        -ms-transform: translateX(34px);
        transform: translateX(34px);
    }
    `

const Span = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 34px;
    -webkit-transition: .4s;
    transition: .4s;
    
    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        -webkit-transition: .4s;
        transition: .4s;
    }
    `

const NavbarContainer = styled.div`
    position: fixed;
    width: 100%;
    padding: 25px 50px;
    background: ${({ theme }) => theme.componentBackground};
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    z-index: 100;

    

`





function App() {




    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = cookies.get('token')
        let auth = {'token': token}
        auth.token !== undefined ? setIsAuthenticated(true) : setIsAuthenticated(false)
    })



    const [isProfileHovered, setProfileHovered] = useState(false)








    return (
        <ThemeProvider theme={lightTheme}>
                <GlobalStyle/>
                <div>
                        <NavbarContainer>
                            <DivFlexSpaceBetween>

                                {isAuthenticated ? (
                                    <>
                                        <LinkButton to="/">Recipe4u</LinkButton>
                                        <DivFlexSpaceBetween>
                                            <LinkButton
                                                to="/Profile"
                                                onMouseEnter={() => setProfileHovered(true)}
                                                onMouseLeave={() => setProfileHovered(false)}
                                            >
                                                Profile
                                            </LinkButton>
                                        </DivFlexSpaceBetween>
                                    </>
                                ) : (
                                    <>
                                        <LinkButton to="/">Recipe4u</LinkButton>
                                        <DivFlex>
                                            <LinkButton to="/Login">Login</LinkButton>
                                        </DivFlex>
                                    </>
                                )
                                }

                            </DivFlexSpaceBetween>


                        </NavbarContainer>

                    <AutoLogout>
                        <ContentContainer>
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/Login" element={<Login />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route element={<ProtectedRoute />}>
                                    <Route excact path="/Profile/*" element={<Profile/>}/>
                                </Route>
                                <Route exact path="/verifyEmail" element={<VerifyEmail/>}/>
                                <Route exact path="/resetPassword" element={<ResetPassword />}/>
                                <Route exact path="/RecipeDetails/:recipeId" element={<RecipeDetails/>}/>
                            </Routes>
                        </ContentContainer>
                    </AutoLogout>
                </div>
        </ThemeProvider>
    );
}


export default App;
