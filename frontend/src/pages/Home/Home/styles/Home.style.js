import {styled} from "styled-components";
import introBackground from "../../../../assets/intro_Background.jpg";
import {Input, Select} from "../../../../assets/styles/global"

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

export const HomeInput = styled(Input)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
    margin: 15px 0;
`

export const HomeSelect = styled(Select)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
    margin: 15px 0;
`

export const SearchHeader = styled.h3`
    color: ${({ theme }) => theme.secondText};
    font-size: 20px;
    margin-bottom: 20px;
    font-style: italic;
    font-weight: 200;
`

export const Header1 = styled.h1`
    font-style: normal;
    font-weight: 400;
`

