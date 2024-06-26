import { React, useState, useEffect } from 'react';
import axios from "../../services/axiosConfig";

import {userGetUserID} from "../../hooks/useGetUserInfo/useGetUserID";

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
                    url: `/api/savedRecipes/${userId}`,
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




    return (
        <div>
            <h1>Saved recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <RecipeComponent
                        key={recipe._id}
                        recipe={recipe}

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