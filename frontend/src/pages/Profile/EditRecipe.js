import React, { useState, useEffect } from 'react';
import axios from "../../services/axiosConfig";
import { useParams } from 'react-router-dom';
import {DangerButtonSmall, DarkButton, DivFlex, PrimaryButton, RecipeImage} from "../../assets/styles/global";
import {userGetUserID} from "../../hooks/useGetUserInfo/useGetUserID";

import {styled} from "styled-components";

import {
    DivFlexRecipeImgAndIngredients, InstructionContainer, InstructionsParagraph, RecipeDetailWrapper,
    RecipeHeight,
    RecipeWrapper,
} from "../../components/Recipe/style/RecipeComponent.style";

import RecipeImages from "../../components/Recipe/components/RecipeImages/RecipeImages";
import RecipeIngredients from "../../components/Recipe/components/RecipeIngredients/RecipeIngredients";
import {CreateRecipeInput, CreateRecipeSelect, Label, Textarea} from "./CreateRecipe/styles/CreateRecipe.style";

const Div = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;

    @media screen and (max-width: 770px) {
        width: 95%;
        margin: 0 auto;
    }
`
const EditRecipe = () => {
    const userId = userGetUserID();

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false);

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        CookingTime: 0,
        difficulty: "",
        imageUrl: []
    });

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`/api/recipe/${recipeId}`);
                const fetchedRecipe = response.data;
                setRecipe(fetchedRecipe);
                setEditingRecipe({
                    ...fetchedRecipe,
                    ingredients: Array.isArray(fetchedRecipe.ingredients) ? fetchedRecipe.ingredients : fetchedRecipe.ingredients.split(', ')
                });
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };


        fetchRecipeDetails();
    }, [recipeId]);


    if (!recipe) {
        return <div>Loading...</div>;
    }

    const saveChanges = async () => {
        try {

            const configuration = {
                method: "post",
                url: `/api/editRecipe/${recipeId}`,
                data: editingRecipe
            }

            const result = await axios(configuration);
            setEditSuccess(true);
            const updatedRecipes = savedRecipes.map(recipe => {
                if (recipe._id === editingRecipe._id) {
                    return result.data.updatedRecipes;
                }
                return recipe;
            });
            setSavedRecipes(updatedRecipes);
        } catch (err) {
            console.log(err)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditingRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }))
    }

    const handleIngredientChange = (e, index) => {
        const newIngredients = [...editingRecipe.ingredients];
        newIngredients[index] = e.target.value;
        setEditingRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: newIngredients
        }));
    };

    const addIngredient = () => {
        setEditingRecipe({...editingRecipe, ingredients: [...editingRecipe.ingredients, ""]})
    }
    const removeIngredient = (index) => {
        setEditingRecipe(prevRecipe => {
            const ingredients = [...prevRecipe.ingredients];
            ingredients.splice(index, 1);
            return { ...prevRecipe, ingredients };
        });
    };



    return (
        <div>
            <RecipeHeight>
                <RecipeWrapper>
                    <div style={{paddingTop: "150px", marginBottom: "70px"}}>
                        <RecipeDetailWrapper>
                            <div>
                                <div style={{paddingTop: "30px"}}>
                                    <h2>{recipe.name}</h2>
                                    <DivFlex style={{alignItems: "center"}}>
                                        <DivFlex style={{alignItems: "center", marginRight: "20px"}}>
                                            <p>{recipe.CookingTime} minutes</p>
                                        </DivFlex>
                                        <p>Difficulty: {recipe.difficulty}</p>
                                    </DivFlex>
                                    <DivFlexRecipeImgAndIngredients>
                                        <RecipeImages recipe={recipe} displayMode="all"/>
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
            {editingRecipe && (
                <Div>
                    <h2>Edit Recipe</h2>

                    <Label htmlFor="name">Name</Label>
                    <CreateRecipeInput
                        style={{marginBottom: "20px"}}
                        type="text"
                        id="edit-name"
                        name="name"
                        value={editingRecipe.name}
                        onChange={handleInputChange}
                    />


                    <Label htmlFor="edit-ingredients">Ingredients</Label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <Label style={{marginRight: "10px"}} htmlFor={`edit-ingredient-${index}`}>{`Ingredient ${index + 1}`}</Label>
                            <input
                                id={`edit-ingredient-${index}`}
                                name={`ingredient-${index}`}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                            <DangerButtonSmall style={{margin: "5px 0 5px 5px"}} type="button"
                                               onClick={() => removeIngredient(index)}>delete</DangerButtonSmall>
                        </div>
                    ))}


                    <DarkButton onClick={addIngredient} type="button">Add ingredient</DarkButton>


                    <label htmlFor="edit-instructions">Instructions</label>
                    <Textarea
                        id="edit-instructions"
                        name="instructions"
                        minLength={100}
                        value={editingRecipe.instructions}
                        onChange={handleInputChange}
                    ></Textarea>


                    <Label htmlFor="CookingTime">Cooking time (minues)</Label>
                    <CreateRecipeSelect
                        id="edit-cookingTime"
                        name="CookingTime"
                        value={editingRecipe.CookingTime}
                        onChange={handleInputChange}
                    >
                        <option hidden value="none">Select one... (none)</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                        <option value="120">120</option>
                        <option value="150">150</option>
                        <option value="180">180</option>
                    </CreateRecipeSelect>


                    <Label htmlFor="difficulty">difficulty</Label>
                    <CreateRecipeSelect
                        id="edit-difficulty"
                        name="difficulty"
                        value={editingRecipe.difficulty}
                        onChange={handleInputChange}
                    >
                        <option hidden value="nonde">Select one... (none)</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </CreateRecipeSelect>


                    <div style={{marginBottom: "50px"}}>
                        <PrimaryButton style={{marginTop: "30px"}} onClick={saveChanges}>Edit recipe</PrimaryButton>
                        {editSuccess && <div style={{marginTop: "10px"}}>Editace byla úspěšně provedena!</div>}
                    </div>
                </Div>
            )}
        </div>
    );
};

export default EditRecipe;
