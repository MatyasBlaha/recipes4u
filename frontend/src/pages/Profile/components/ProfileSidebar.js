import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';
import { LinkButton, DivFlexColumn } from "../../../assets/styles/global";
import { SidebarContainer, ActiveLinkButton, Sidebar, ToggleButtonContainer, ToggleButton, Hamburger } from "./styles/ProfileSidebar.style";

const ProfileSidebar = () => {
    const cookies = new Cookies();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 770) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        cookies.remove("role");
        window.location.href = "/";
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 720) {
            setIsOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <SidebarContainer>
            <ToggleButtonContainer>
                <ToggleButton onClick={toggleSidebar}>
                    <Hamburger isOpen={isOpen} />
                </ToggleButton>
            </ToggleButtonContainer>
            <Sidebar isOpen={isOpen}>
                <div>
                    <ActiveLinkButton to="/Profile" end onClick={closeSidebar} style={isActive("/Profile") ? {backgroundColor: '#e0e0e0'} : {}}>Profile</ActiveLinkButton>
                    <ActiveLinkButton to="/Profile/MyReceipts" onClick={closeSidebar} className={isActive("/Profile/MyReceipts") ? "active" : ""}>moje recepty</ActiveLinkButton>
                    <ActiveLinkButton to="/Profile/CreateRecipe" onClick={closeSidebar} className={isActive("/Profile/CreateRecipe") ? "active" : ""}>create recipe</ActiveLinkButton>
                    <ActiveLinkButton to="/Profile/SavedRecipes" onClick={closeSidebar} className={isActive("/Profile/SavedRecipes") ? "active" : ""}>saved recipes</ActiveLinkButton>
                </div>
                <div>
                    <ActiveLinkButton onClick={handleLogout}>Odhlásit</ActiveLinkButton>
                </div>
            </Sidebar>
        </SidebarContainer>
    );
};

export default ProfileSidebar;
