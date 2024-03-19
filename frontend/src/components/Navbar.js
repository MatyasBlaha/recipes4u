import React, {useState} from 'react'

import {ThemeProvider, styled} from "styled-components";

import {lightTheme, darkTheme, GlobalStyle} from "../styles/theme"
import {colors} from "../styles/colors"
import {DivFlex, Button} from "../styles/style"


const Label = styled.label `
    position: relative;
    display: inline-block;
    width: 60px;
    height: 26px;
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
        height: 22px;
        width: 22px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        -webkit-transition: .4s;
        transition: .4s;
    }
    `

const NavbarLink = styled(Button)`   
    background-color: ${colors.primaryBlue};
    //color: ${colors.primaryWhite};
`


const ContainerDiv = styled(DivFlex) `
    justify-content: space-between;
`


const Navbar = ({isAuthenticated}) => {

    const [theme, setTheme] = useState('light');
    const isDarkTheme = theme === 'dark';

    const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark');


    return(
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <div>
                <GlobalStyle/>
                <ContainerDiv>

                    {isAuthenticated ? (
                        <>
                            <Button to="/">main page</Button>
                            <NavbarLink to="/Profile">Profile</NavbarLink>
                        </>
                    ) : (
                        <>
                            <Button to="/">main page</Button>
                            <NavbarLink to="/Login">Login</NavbarLink>
                        </>
                    )
                    }


                    {/*<div>*/}
                    {/*    <Label>*/}
                    {/*        <Input type="checkbox" checked={isDarkTheme} onChange={toggleTheme}/>*/}
                    {/*        <Span></Span>*/}
                    {/*    </Label>*/}
                    {/*</div>*/}
                </ContainerDiv>


            </div>
        </ThemeProvider>
    )
}

export default Navbar;