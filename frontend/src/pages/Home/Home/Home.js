import React, { useState, useEffect } from 'react';
import axios from "axios";

//Import components
import RecipeComponent from "../../../components/Recipe/RecipeComponent";
import Footer from "../../../components/Footer";

//Import styles
import {
    ContentCenter,
    DivCenter,
    PrimaryButton
} from "../../../assets/styles/global";

import {
    HomeForm,
    IntroWrapper,
    Overlay,
    HomeInput,
    HomeSelect,
    SearchHeader,
    Header1
} from "./styles/Home.style";

//Import UseGet
import { userGetUserID } from "../../../hooks/useGetUserInfo/useGetUserID";
import { useGetUserRole } from "../../../hooks/useGetUserInfo/useGetUserRole";

//Import UseApiRequest
import { UseFetchRecipes } from '../../../hooks/recipe/api/FetchRecipes/UseFetchRecipes';
import { UseFetchSavedRecipes } from '../../../hooks/recipe/api/FetchSavedRecipes/UseFetchSavedRecipes';
import {UseSaveRecipeRequest} from "../../../hooks/recipe/api/SaveRecipeRequest/UseSaveRecipeRequest";
import {UseRemoveSavedRecipeRequest} from "../../../hooks/recipe/api/RemoveSavedRecipeRequest/UseRemoveSavedRecipeRequest";
import {UseDeleteRecipeRequest} from "../../../hooks/recipe/api/DeleteRecipeRequest/UseDeleteRecipeRequest";



const Home = () => {

    const userId = userGetUserID();
    const userRole = useGetUserRole();

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [message, setMessage] = useState('');
    const [searchArea, setSearchArea] = useState('');
    const [cookingTimeArea, setCookingTimeArea] = useState('');
    const [difficultyArea, setDifficultyArea] = useState('');


    const fetchRecipes = async () => {
        try {
            const data = await UseFetchRecipes();
            setRecipes(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchSavedRecipes = async () => {
        try {
            const data = await UseFetchSavedRecipes(userId);
            setSavedRecipes(data);
        } catch (error) {
            setMessage(error.message);
        }
    };


    useEffect(() => {
        fetchRecipes();

        if (userId) {
            fetchSavedRecipes();
        }
    }, [userId]);




    const handleSearch = async (e) => {
        e.preventDefault();
        const configuration = {
            method: "get",
            url: `http://localhost:8080/api/recipes/search?name=${searchArea}&CookingTime=${cookingTimeArea}&difficulty=${difficultyArea}`,
        }
        axios(configuration)
            .then((result) => {
                setRecipes(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    };




    const saveRecipe = async (recipeId) => {
        try {
            const savedRecipes = await UseSaveRecipeRequest(recipeId);
            setSavedRecipes(savedRecipes);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const removeSavedRecipe = async (recipeId) => {
        try {
            const savedRecipes = await UseRemoveSavedRecipeRequest(recipeId);
            setSavedRecipes(savedRecipes);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const isRecipeSaved = (id) => savedRecipes?.includes(id)




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



    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);



    return (
        <div>
            <IntroWrapper>
                <Overlay>
                    <ContentCenter>
                        <HomeForm onSubmit={handleSearch}>
                            <DivCenter>
                                <SearchHeader>Search for Recipe</SearchHeader>
                            </DivCenter>
                            <HomeInput
                                type="text"
                                placeholder="Search for a recipe"
                                value={searchArea}
                                onChange={(e) => setSearchArea(e.target.value)}
                            />
                            <HomeSelect
                                value={cookingTimeArea}
                                onChange={(e) => setCookingTimeArea(e.target.value)}
                            >
                                <option value="">Select cooking time</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                                <option value="90">90</option>
                                <option value="120">120</option>
                                <option value="150">150</option>
                                <option value="180">180</option>
                            </HomeSelect>
                            <HomeSelect
                                value={difficultyArea}
                                onChange={(e) => setDifficultyArea(e.target.value)}
                            >
                                <option value="">Select difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </HomeSelect>
                            <DivCenter>
                                <PrimaryButton style={{ marginTop: "40px" }} type="submit">search</PrimaryButton>
                            </DivCenter>
                        </HomeForm>
                    </ContentCenter>
                </Overlay>
            </IntroWrapper>
            {recipes && (
                <div>
                    <DivCenter>
                        <Header1 style={{ margin: "60px 0 20px 0 " }}>Recipes for today</Header1>
                    </DivCenter>
                    <ul>
                        <div>
                            {recipes.map((recipe) => (
                                <RecipeComponent
                                    key={recipe._id}
                                    recipe={recipe}
                                    recipeButtons="main"
                                    saveRecipe={saveRecipe}
                                    removeSavedRecipe={removeSavedRecipe}
                                    deleteRecipe={() => deleteRecipe(recipe._id)}
                                    isRecipeSaved={isRecipeSaved(recipe._id)}
                                    userRole={userRole}
                                    message={message}
                                    displayMode="single"
                                    showDetailsLink
                                />
                            ))}
                        </div>
                    </ul>
                </div>
            )}
            <Footer />
        </div>
    )
};

export default Home;
