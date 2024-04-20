import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconButton,
    Img,
    RecipeContainer,
    RecipeContentContainer,
    RecipeWrapper
} from "../../style/RecipeComponent.style";
import {Link} from "react-router-dom";
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import {DivFlex} from "../../../../assets/styles/global";
import iconClock from "../../../../assets/icons/icon_clock.png";
import RecipeImages from "../RecipeImages/RecipeImages";

const RecipePreviewContent = ({recipe, displayMode, editRecipe, recipeButtons, deleteRecipe, userRole, saveRecipe, removeSavedRecipe, isRecipeSaved, showDetailsLink }) => {
const navigate = useNavigate()


    const handleDivClick = () => {
        if (showDetailsLink) {
            navigate(`/RecipeDetails/${recipe._id}`);
        }
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateText = (text) => {
        const maxWidth = windowWidth;

        if (maxWidth <= 768) {
            return `${text.slice(0, 200)}...`;
        } else {
            return `${text.slice(0, 497)}...`;
        }
    };

    return (
        <RecipeWrapper>
            <RecipeContainer>
                <div>
                    {editRecipe === 'editRecipe' &&
                        <Link to={`/Profile/editRecipe/${recipe._id}`}>Edit</Link>
                    }
                    <RecipeButtons recipeButton={recipeButtons} deleteRecipe={deleteRecipe} userRole={userRole} recipeId={recipe._id} saveRecipe={saveRecipe} removeSavedRecipe={removeSavedRecipe} isRecipeSaved={isRecipeSaved} />
                </div>
                <div key={recipe._id} onClick={handleDivClick} style={{cursor: showDetailsLink ? 'pointer' : 'default'}}>
                    <RecipeContentContainer>
                        <div style={{maxWidth: "75%"}}>
                            <h2>{recipe.name}</h2>
                            <DivFlex style={{alignItems: "center"}}>
                                <DivFlex style={{alignItems: "center", marginRight: "20px"}}>
                                    <IconButton style={{margin: "0"}}>
                                        <Img src={iconClock} alt="Cooking Time"></Img>
                                    </IconButton>
                                    <p>{recipe.CookingTime} minutes</p>
                                </DivFlex>
                                <p>Difficulty: {recipe.difficulty}</p>
                            </DivFlex>
                            <p style={{marginBottom:"10px"}}>{truncateText(recipe.instructions)}</p>
                        </div>
                        <div>
                            <RecipeImages recipe={recipe} displayMode={displayMode} />
                        </div>
                    </RecipeContentContainer>
                </div>
            </RecipeContainer>
        </RecipeWrapper>
    )
}

export default RecipePreviewContent