import { React, useState, useEffect } from 'react';
import axios from "../../services/axiosConfig";
import {userGetUserID} from "../../hooks/useGetUserInfo/useGetUserID";

import RecipeComponent from "../../components/Recipe/RecipeComponent";

import deleteRecipe from '../../components/Recipe/components/RecipeButtons/RecipeButtons';
import {UseDeleteRecipeRequest} from "../../hooks/recipe/api/DeleteRecipeRequest/UseDeleteRecipeRequest";

const MyRecipes = () => {
    const userId = userGetUserID();

    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState('')
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState({
        name: "",
        ingredients: "",
        instructions: "",
        CookingTime: 0,
        difficulty: "",
        imageUrl: ""
    });

    useEffect( () => {
        const fetchSavedRecipe = async () => {
            try {
                const result = await axios.get(`/api/myRecipes/${userId}`);
                setSavedRecipes(result.data.myRecipes);
            } catch (err) {
                console.log(err);
                setMessage(err)
            }
        }

        fetchSavedRecipe()
    }, [])

    const deleteRecipe = async (recipeId) => {
        try {
            await UseDeleteRecipeRequest(recipeId);

            if (savedRecipes && savedRecipes.length > 0) {
                setSavedRecipes(prevSavedRecipes => prevSavedRecipes.filter(recipe => recipe && recipe._id !== recipeId));
            }

            if (recipes && recipes.length > 0) {
                setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe && recipe._id !== recipeId));
            }

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>My recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <RecipeComponent
                        key={recipe._id}
                        recipe={recipe}

                        //Prompt buttons
                        recipeButtons='myRecipes'
                        deleteRecipe={() => deleteRecipe(recipe._id)}
                        editRecipe='editRecipe'

                        message={message}
                        displayMode="single"
                        showDetailsLink
                    />
                ))}
            </ul>
        </div>
    )
}

export default MyRecipes;