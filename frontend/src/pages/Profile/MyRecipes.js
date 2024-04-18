import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import {userGetUserID} from "../../hooks/useGetUserID";

import {RecipeImage} from "../../assets/styles/global"
import RecipeComponent from "../../components/Recipe/RecipeComponent";

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


    const confirmDeleteRecipe = (recipeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            deleteRecipe(recipeId);
        }
    };
    const deleteRecipe = async (recipeId) => {
        try {

            const data = {
                userId, recipeId
            }

            const configuration = {
                method: "post",
                url: `http://localhost:8080/api/deleteMyRecipe`,
                data
            }

            axios(configuration)
                .then((result) => {
                    setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId));
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {

        }
    }



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
                        deleteRecipe={() => confirmDeleteRecipe(recipe._id)}
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