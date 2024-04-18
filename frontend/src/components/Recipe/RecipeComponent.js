import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import iconHeart from "../../assets/icon_heart.png";
import iconHeartDisabled from "../../assets/icon_heart_disabled.png";
import iconClock from "../../assets/icon_clock.png";

import {styled} from "styled-components";

import {
    ContentCenter,
    DivCenter,
    DivFlex, DivFlexColumn,
    DivFlexSpaceBetween,
    RecipeImage,
    DarkButtonSmall,
}
    from '../../assets/styles/global';

import {
    RecipeContainer,
    RecipeContentContainer,
    IconButton,
    Img,
    RecipeDetailWrapper,
    RecipeImageBig,
    RecipeImageSmall,
    RecipeWrapper,
    RecipeImageSmallContainer,
    IngredientsContainer,
    LeftColumn,
    RightColumn,
    IngredientItem, DivFlexRecipeImgAndIngredients, DivFlexRecipeDetailImgs, InstructionContainer
} from './RecipeComponent.style'






const RecipeComponent = ({ recipe, displayMode, showDetailsLink, recipeButtons, saveRecipe, editRecipe, removeSavedRecipe, deleteRecipe, isRecipeSaved, userRole, message }) => {
    const navigate = useNavigate();




    const renderImages = () => {
        if (displayMode === 'single' && recipe.files.length) {
            return <RecipeImageBig style={{width: "180px", height:"180px"}} src={require(`../../data/images/${recipe.files[0]}`)} alt={recipe.name} />;
        }
        else if (displayMode === 'all') {
            return (
                <DivFlexRecipeDetailImgs>
                    <RecipeImageBig src={require(`../../data/images/${recipe.files[0]}`)} alt={`${recipe.name} 1`} />
                    <RecipeImageSmallContainer>
                        {recipe.files.slice(1).map((file, index) => (
                            <RecipeImageSmall key={index + 1} src={require(`../../data/images/${file}`)} alt={`${recipe.name} ${index + 2}`} />
                        ))}
                    </RecipeImageSmallContainer>
                </DivFlexRecipeDetailImgs>
            );
        }
    };





    const renderButtons = () => {
        if(recipeButtons === 'main') {
            return (
                <div>
                    <IconButton onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved}>
                        {isRecipeSaved ? <Img src={iconHeart} alt="Save recipe"></Img> :
                            <Img src={iconHeartDisabled} alt="Save recipe"></Img>}
                    </IconButton>
                    {userRole === 1 && (
                        <div>
                            <button onClick={() => deleteRecipe(recipe._id)}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )
        } else if (recipeButtons === 'savedRecipes') {
            return (
                <div>
                    <button onClick={() => removeSavedRecipe(recipe._id)}>
                        Remove saved recipe
                    </button>
                </div>
            );
        } else if (recipeButtons === 'myRecipes'){
            return (
                <div>
                    <button onClick={() => deleteRecipe(recipe._id)}>delete recipe</button>
                </div>
            );
        }
    }



    const renderIngredients = () => {
        if (displayMode === 'all') {
            const ingredients = recipe.ingredients;
            const halfLength = Math.ceil(ingredients.length / 2);
            const leftIngredients = ingredients.slice(0, halfLength);
            const rightIngredients = ingredients.slice(halfLength);

            return (
                <DivFlexColumn style={{width: "100%"}}>
                    <DivCenter style={{marginBottom: "20px", marginTop: "20px"}}>
                        <h3>Ingredients</h3>
                    </DivCenter>
                    <IngredientsContainer>

                        <LeftColumn>
                            {leftIngredients.map((ingredient, index) => (
                                <IngredientItem key={index}>{ingredient}</IngredientItem>
                            ))}
                        </LeftColumn>
                        <RightColumn>
                            {rightIngredients.map((ingredient, index) => (
                                <IngredientItem key={index}>{ingredient}</IngredientItem>
                            ))}
                        </RightColumn>
                    </IngredientsContainer>
                </DivFlexColumn>
            );
        }
    };



    const handleDivClick = () => {
        if (showDetailsLink) {
            navigate(`/RecipeDetails/${recipe._id}`);
        }
    };


    const handleReturn = () => {
        navigate('/');
    }




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

            <div>
                {showDetailsLink ? (
                    <RecipeWrapper>
                        <RecipeContainer>
                            <div>
                                {editRecipe === 'editRecipe' &&
                                    <Link to={`/Profile/editRecipe/${recipe._id}`}>Edit</Link>}
                                {renderButtons()}
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
                                                        <p>{recipe.CookingTime} mintues</p>
                                                    </DivFlex>
                                                    <p>Difficulty: {recipe.difficulty}</p>
                                                </DivFlex>
                                                <p style={{marginBottom:"10px"}}>{truncateText(recipe.instructions)}</p>
                                            </div>
                                            <div>
                                                <div>{renderImages()}</div>
                                            </div>
                                        </RecipeContentContainer>
                                </div>
                        </RecipeContainer>
                    </RecipeWrapper>
                ) : (
                    <RecipeWrapper>
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
                                                <p>{recipe.CookingTime} mintues</p>
                                            </DivFlex>
                                            <p>Difficulty: {recipe.difficulty}</p>
                                        </DivFlex>
                                        <DivFlexRecipeImgAndIngredients>
                                            {renderImages()}
                                            {renderIngredients()}
                                        </DivFlexRecipeImgAndIngredients>
                                        <InstructionContainer>
                                            <h3>Instructions</h3>
                                            <p>{recipe.instructions}</p>
                                        </InstructionContainer>
                                    </div>
                                </div>
                            </RecipeDetailWrapper>
                        </div>
                    </RecipeWrapper>
                )}
            </div>
    );
};

export default RecipeComponent;
