import {styled} from "styled-components";

export const ProfileContainer = styled.div`
    padding-top: 100px;
    height: 100%;
`

export const ProfileContent = styled.div`
    margin-left: 250px;
    padding-top: 70px;
    width: 80%;
    
    @media screen and (max-width: 770px) {
        margin-left: 0;
        width: 100%;
    }
`