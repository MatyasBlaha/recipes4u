import React from 'react'


import {FooterWrapper, FooterContent, LinksContainer, LinkButtonFooter, A} from "./styles/Footer.style";


const Footer = () => {

    return(
        <FooterWrapper>
            <FooterContent>
                <LinksContainer>
                    <LinkButtonFooter to="/">Home</LinkButtonFooter>
                    <LinkButtonFooter to="">Login</LinkButtonFooter>
                    <LinkButtonFooter to="">Profile</LinkButtonFooter>
                </LinksContainer>
                <LinksContainer>
                    <LinkButtonFooter to="">FAQ</LinkButtonFooter>
                    <LinkButtonFooter to="">Support</LinkButtonFooter>
                </LinksContainer>
                <LinksContainer>

                </LinksContainer>
            </FooterContent>
            <div>
                <A href="https://www.linkedin.com/in/maty%C3%A1%C5%A1-bl%C3%A1ha-5286a6219/">Created by @Matyas Blaha</A>
            </div>
        </FooterWrapper>
    )
}

export default Footer;