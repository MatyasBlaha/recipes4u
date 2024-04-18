import {styled} from "styled-components";
import {NavLink, Link} from 'react-router-dom'


export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    margin:  auto;
    overflow: hidden;
`






export const DivFlex = styled.div`
    display: flex;
`

export const DivCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DivFlexSpaceBetween = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `

export const DivFlexColumn = styled(DivFlex)`
    flex-direction: column;
`


export const ContentWrapper = styled.div`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.body};
`
export const ContentCenter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`






export const LinkButton = styled(Link) `
    color: ${({ theme }) => theme.secondText};
    padding: 12px 44px;
    border-radius: 8px;
    text-decoration: none;
`

export const PrimaryLink = styled(LinkButton) `
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    font-style: normal;
    background: ${({ theme }) => theme.primaryBlue};
    color: ${({ theme }) => theme.secondText};
`

export const PrimaryButton = styled.button `
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    font-style: normal;
    background: ${({ theme }) => theme.primaryBlue};
    color: ${({ theme }) => theme.secondText};
    padding: 12px 44px;
    border-radius: 8px;
    border: none;
    text-decoration: none;
    cursor: pointer;
`

export const DarkButton = styled.button`
    padding: 12px 44px;
    border-radius: 8px;
    border: 0 solid;
    text-decoration: none;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    font-style: normal;
    background: ${({ theme }) => theme.componentBackground};
    color: ${({ theme }) => theme.secondText};
    cursor: pointer;
`

export const DarkButtonSmall = styled(DarkButton)`
    font-style: italic;
    font-size: 14px;
    padding: 8px 14px;
`
export const DangerButtonSmall = styled(DarkButtonSmall)`
    background: ${({ theme }) => theme.danger};
`



export const Input = styled.input`
    padding: 10px;
    border-radius: 10px;
    border: 2px solid transparent;
    background: ${({ theme }) => theme.componentBackground};
    color: ${({ theme }) => theme.secondText};
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    margin-top: 7px;

    &:active,
    &:focus {
        outline: none;
        border: 2px solid ${({ theme }) => theme.primaryBlue};
        box-shadow: 0 0 10px ${({ theme }) => theme.primaryBlue};
    }
    
    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.componentBackground} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.secondText} !important;
    }
`


export const Select = styled.select`
    padding: 10px;
    border-radius: 10px;
    border: 2px solid transparent;
    background: ${({ theme }) => theme.componentBackground};
    color: ${({ theme }) => theme.secondText};
    width: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    margin-top: 7px;

    &:active,
    &:focus {
        outline: none;
        border: 2px solid ${({ theme }) => theme.primaryBlue};
        box-shadow: 0 0 10px ${({ theme }) => theme.primaryBlue};
    }
    
    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.componentBackground} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.secondText} !important;
    }
    
    
`








export const RecipeImage = styled.img `
    height: 200px;
`

export const PrimarySpan = styled.span`
    color: ${({ theme }) => theme.primaryBlue};
`







export const LoginWrapper = styled.div`
    height: 100vh;
    width: 100vw;
`
export const LoginContainer = styled.div`
    height: 580px;
    width: 100%;
    max-width: 800px;
    border-radius: 30px;
    margin: 0 20px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    background: ${({ theme }) => theme.componentBackground};
    color: ${({ theme }) => theme.secondText};
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media  (max-width: 600px) {
        flex-direction: column;
        height: 800px;
        
        & > div:nth-child(1) {
            height: 60%;
        }
    }
`


export const LoginSideContainer = styled(DivFlexColumn)`
    height: 100%;
    width: 50%;
`


export const LoginSideContentContainer = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    h4 {
        font-weight: 200;
        font-size: 28px;
        align-content: center;
        margin-bottom: 40px;
    }
    
    p {
        font-weight: 200;
        font-size: 14px;
        align-content: center;
        margin-bottom: 40px;
    }
`


export const LoginFormWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    align-items: center;
    border-radius: 0 30px 30px 0;
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
    
    @media  (max-width: 600px) {
        border-radius: 0 0 30px 30px;
    }
`


export const Form = styled.form`
    height: 90%;
    width: 80%;
`

export const LoginFormContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
`

export const LoginFormInputs = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const LabelContainer = styled.div`
    margin: 10px 0;
`

export const DangerButtonClose = styled(DangerButtonSmall)`
    margin-left: 10px;
`