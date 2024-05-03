import React, { useState, useEffect } from 'react';
import axios from '../../services/axiosConfig'
import { useParams } from 'react-router-dom';
import RecipeComponent from "../../components/Recipe/RecipeComponent";
import Footer from "../../components/Footer";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);


    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`/api/recipe/${recipeId}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);


    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>

                <RecipeComponent
                    key={recipe._id}
                    recipe={recipe}
                    displayMode="all"
                />


            </div>
            <Footer/>
        </div>
    );
};

export default RecipeDetails;
