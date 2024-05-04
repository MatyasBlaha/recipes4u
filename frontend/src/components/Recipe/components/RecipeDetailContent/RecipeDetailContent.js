import react from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import {
    RecipeHeight,
    DivFlexRecipeImgAndIngredients,
    IconButton,
    Img,
    InstructionContainer,
    RecipeDetailWrapper,
    RecipeWrapper, InstructionsParagraph
} from "../../style/RecipeComponent.style";


import {DarkButtonSmall, DivFlex} from "../../../../assets/styles/global";
import iconClock from "../../../../assets/icons/icon_clock.png";


import RecipeImages from "../RecipeImages/RecipeImages";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";

const RecipeDetailContent = ({recipe, recipeButtons, isRecipeSaved, removeSavedRecipe, deleteRecipe, userRole, saveRecipe, displayMode}) => {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/');
    }

    return (
        <RecipeHeight>
            <RecipeWrapper>
                <RecipeButtons recipeButtons={recipeButtons} deleteRecipe={deleteRecipe} userRole={userRole} recipeId={recipe._id} saveRecipe={saveRecipe} removeSavedRecipe={removeSavedRecipe} isRecipeSaved={isRecipeSaved} />
                <div style={{paddingTop: "150px", marginBottom: "70px"}}>
                    <RecipeDetailWrapper>
                        <div>
                            <DarkButtonSmall onClick={handleReturn}>Back to home</DarkButtonSmall>
                            <div style={{paddingTop: "30px"}}>
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
                                <DivFlexRecipeImgAndIngredients>
                                    <RecipeImages recipe={recipe} displayMode={displayMode}/>
                                    <RecipeIngredients displayMode="all" recipeIngredients={recipe.ingredients}/>
                                </DivFlexRecipeImgAndIngredients>
                                <InstructionContainer>
                                    <h3>Instructions</h3>
                                    <InstructionsParagraph>{recipe.instructions}</InstructionsParagraph>
                                </InstructionContainer>
                            </div>
                        </div>
                    </RecipeDetailWrapper>
                </div>
            </RecipeWrapper>
        </RecipeHeight>
    )
}

export default RecipeDetailContent