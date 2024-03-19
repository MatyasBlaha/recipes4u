import {styled} from "styled-components";
import {Link} from 'react-router-dom'

export const DivFlex = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    `

export const Button = styled(Link)`
    padding: 15px 30px;
    border-radius: 15px;
`

export const ButtonPrimary = styled(Button)`
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.text};
`

export const ButtonSecondary = styled(Button)`

`