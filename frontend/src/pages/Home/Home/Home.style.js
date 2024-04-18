import {styled} from "styled-components";
import introBackground from "../../../assets/intro_Background.jpg";

export const IntroWrapper = styled.div`
    background-image: url(${introBackground});
    width: 100vw;
    height: 800px;
    background-size: cover;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 800px;
    background: rgba(0, 0, 0, 0.5);
`;

export const HomeForm = styled.form`
    width: 700px;
    align-items: center;
    padding: 40px 60px;
    border-radius: 30px;
    margin: 0 20px;
    background: ${({ theme }) => theme.componentBackground};
    
    @media screen and (max-width: 540px) {
        padding: 20px 30px;
    }
`


