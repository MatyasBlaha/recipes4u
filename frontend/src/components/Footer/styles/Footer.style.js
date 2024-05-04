import {styled} from "styled-components";
import {LinkButton} from "../../../assets/styles/global";


export const FooterWrapper = styled.div`
    background: ${({ theme }) => theme.componentBackground};
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;


    @media screen and (max-width: 540px) {
     height: 350px;
    }
`

export const FooterContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 540px) {
        flex-direction: column;
    }
`


export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const A = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.secondText};
`

export const LinkButtonFooter = styled(LinkButton)`
    
    &::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: ${({ theme }) => theme.secondText};
        transition: width .3s;
    }

    &:hover::after {
        width: 100%;
`
