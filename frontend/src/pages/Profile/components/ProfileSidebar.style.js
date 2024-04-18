import { styled } from "styled-components";
import { colors } from "../../../styles/colors";
import { NavLink } from 'react-router-dom';
import { LinkButton } from "../../../assets/styles/global";

export const SidebarContainer = styled.div`
    position: fixed;
    width: 100%;
    z-index: 1000;
`;

export const Sidebar = styled.nav`
    margin: 94px 0 0 0;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    justify-content: space-between;
    height: ${({ isOpen }) => (isOpen ? 'calc(100% - 100px)' : '0px')};
    background-color: #f1f1f1;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;

    @media (min-width: 770px) {
        width: 200px;
        margin-top: 94px;
    }
`;

export const ActiveLinkButton = styled(LinkButton)`
    justify-content: center;
    display: flex;
    width: 100%;
    padding: 25px 0;
    text-decoration: none;
    color: ${colors.primaryGrey};
    background-color: ${colors.primaryWhite};

    &:active {
        color: ${colors.primaryWhite};
        background-color: ${colors.primaryBlue};
    }

    &.active {
        background-color: ${colors.primaryBlue};
        color: ${colors.primaryWhite};
    }
`;


export const ToggleButtonContainer = styled.div`
    position: absolute;
    top: -50px; 
    left: 50%; 

    transform: translate(-50%, -50%);
`
export const ToggleButton = styled.div`
    top: 50px;
    z-index: 1000;
    left: 0;
    height: 50px; /* Adjust height as needed */
    cursor: pointer;
    float: right;
    
    @media (min-width: 770px) {
        display: none;
        
    }
`;

export const Hamburger = styled.div`
    width: 30px;
    z-index: 1500;
    height: 3px;
    background-color: ${colors.primaryWhite};
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 3px;
        background-color: ${colors.primaryWhite};
    }

    &::before {
        top: -10px;
    }

    &::after {
        top: 10px;
    }

    ${({ isOpen }) => isOpen && `
        background-color: transparent;

        &::before {
            top: 0;
            transform: rotate(45deg);
        }

        &::after {
            top: 0;
            transform: rotate(-45deg);
        }
    `}
`;
