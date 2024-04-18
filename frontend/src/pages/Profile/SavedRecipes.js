import { React, useState, useEffect } from 'react';
import axios from "axios";
import {userGetUserID} from "../../hooks/useGetUserID";

import {RecipeImage} from "../../assets/styles/global"
import RecipeComponent from "../../components/Recipe/RecipeComponent";

const SavedRecipes = () => {
    const userId = userGetUserID();

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [message, setMessage] = useState('')

    useEffect( () => {
        const fetchSavedRecipe = async () => {
            try {
                const configuration = {
                    method: "get",
                    url: `http://localhost:8080/api/savedRecipes/${userId}`,
                }

                axios(configuration)
                    .then((result) => {
                        setSavedRecipes(result.data.savedRecipes)
                    })
                    .catch((err) => {
                        console.log(err)
                        setMessage(err)
                    })
            } catch (e) {

            }
        }

        fetchSavedRecipe()
    }, [])

    const removeSavedRecipe = async (recipeId) => {
        try {

            const data = {
                userId, recipeId
            }

            const configuration = {
                method: "post",
                url: `http://localhost:8080/api/removeSavedRecipe`,
                data
            }

            axios(configuration)
                .then((result) => {
                    setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId));
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {

        }
    }



    return (
        <div>
            <h1>Saved recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <RecipeComponent
                        key={recipe._id}
                        recipe={recipe}

                        //Prompt buttons
                        recipeButtons='savedRecipes'
                        removeSavedRecipe={removeSavedRecipe}

                        message={message}
                        displayMode="single"
                        showDetailsLink
                    />
                ))}
            </ul>
        </div>
    )
}

export default SavedRecipes;