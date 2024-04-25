import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import {userGetUserID} from "../../hooks/useGetUserInfo/useGetUserID";

import {RecipeImage} from "../../assets/styles/global"
import RecipeComponent from "../../components/Recipe/RecipeComponent";

import deleteRecipe from '../../components/Recipe/components/RecipeButtons/RecipeButtons';

const MyRecipes = () => {
    const userId = userGetUserID();

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
                const result = await axios.get(`http://localhost:8080/api/myRecipes/${userId}`);
                setSavedRecipes(result.data.myRecipes);
            } catch (err) {
                console.log(err);
                setMessage(err)
            }
        }

        fetchSavedRecipe()
    }, [])


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