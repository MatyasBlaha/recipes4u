import React, { useState, useEffect } from 'react';
import axios from "../../services/axiosConfig";
import { useParams } from 'react-router-dom';
import {RecipeImage} from "../../assets/styles/global";
import {userGetUserID} from "../../hooks/useGetUserInfo/useGetUserID";

import {styled} from "styled-components";



const Div = styled.div`
    display: flex;
    flex-direction: column;
`
const EditRecipe = () => {
    const userId = userGetUserID();

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

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
            <div>
                <h2>{recipe.name}</h2>
                <p>author: {recipe.userName}</p>
                <p>Cooking Time: {recipe.CookingTime}</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>

                {recipe.files.map((file, index) => (
                    <RecipeImage
                        key={index}
                        src={require(`../../data/images/${file}`)}
                        alt={recipe.name}
                    />
                ))}

            </div>
            {editingRecipe && (
                <Div>
                    <h2>Edit Recipe</h2>
                    <label htmlFor="edit-name">Name</label>
                    <input
                        type="text"
                        id="edit-name"
                        name="name"
                        value={editingRecipe.name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="edit-ingredients">Ingredients</label>
                    {editingRecipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <label htmlFor={`edit-ingredient-${index}`}>{`Ingredient ${index + 1}`}</label>
                            <input
                                id={`edit-ingredient-${index}`}
                                name={`ingredient-${index}`}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                            <button type="button" onClick={() => removeIngredient(index)}>delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>add ingredient</button>
                    <label htmlFor="edit-instructions">Instructions</label>
                    <textarea
                        id="edit-instructions"
                        name="instructions"
                        minLength={100}
                        value={editingRecipe.instructions}
                        onChange={handleInputChange}
                    ></textarea>

                    <label htmlFor="edit-cookingTime">Cooking time (minues)</label>
                    <select
                        id="edit-cookingTime"
                        name="CookingTime"
                        value={editingRecipe.CookingTime}
                        onChange={handleInputChange}
                    >
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                        <option value="120">120</option>
                        <option value="150">150</option>
                        <option value="180">180</option>
                    </select>

                    <label htmlFor="edit-difficulty">difficulty</label>
                    <select
                        id="edit-difficulty"
                        name="difficulty"
                        value={editingRecipe.difficulty}
                        onChange={handleInputChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>


                    <button onClick={saveChanges}>Save</button>
                </Div>
            )}
        </div>
    );
};

export default EditRecipe;
