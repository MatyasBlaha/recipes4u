import React from "react";
import {Routes, Route, Link} from 'react-router-dom';


import ProfileSidebar from '../components/ProfileSidebar'

import MyReceipts from "../MyRecipes";
import ProfileOverview from "../ProfileOverview";
import CreateRecipe from "../CreateRecipe"
import SavedRecipes from "../SavedRecipes";
import EditRecipe from "../EditRecipe";
import Footer from "../../../components/Footer";


import {ContentContainer, DivFlex} from "../../../assets/styles/global";
import {ProfileContainer, ProfileContent} from "./Profile.style";


const Profile = () => {







    return (
        <ContentContainer>
            <ProfileContainer>
                <DivFlex>
                    <ProfileSidebar/>

                    <ProfileContent>
                        <Routes>
                            <Route path="" element={<ProfileOverview/>}/>
                            <Route path="/MyReceipts" element={<MyReceipts/>}/>
                            <Route path="/CreateRecipe" element={<CreateRecipe/>}/>
                            <Route path="/SavedRecipes" element={<SavedRecipes/>}/>
                            <Route exact path="/editRecipe/:recipeId" element={<EditRecipe/>}/>
                        </Routes>
                    </ProfileContent>
                </DivFlex>
                <Footer/>
            </ProfileContainer>
        </ContentContainer>
    )
}

export default Profile;
