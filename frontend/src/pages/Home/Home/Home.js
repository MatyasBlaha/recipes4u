import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import {userGetUserID} from "../../../hooks/useGetUserID";
import {useGetUserRole} from "../../../hooks/useGetUserRole"

import RecipeComponent from "../../../components/Recipe/RecipeComponent";

import {styled} from "styled-components";
import {ContentCenter, Input, Select, DivCenter, PrimaryButton} from "../../../assets/styles/global"
import { HomeForm } from "./Home.style"
import Footer from "../../../components/Footer";
import {IntroWrapper, Overlay} from "./Home.style";


const HomeInput = styled(Input)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
    margin: 15px 0;
`

const HomeSelect = styled(Select)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
    margin: 15px 0;
`

const SearchHeader = styled.h3`
    color: ${({ theme }) => theme.secondText};
    font-size: 20px;
    margin-bottom: 20px;
    font-style: italic;
    font-weight: 200;
`

const Header1 = styled.h1`
    font-style: normal;
    font-weight: 400;
`



const Home = () => {
    const userId = userGetUserID();
    const userRole = useGetUserRole();

    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])
    const [message, setMessage] = useState('')

    const [searchArea, setSearchArea] = useState('');
    const [CookingTimeArea, setCookingTimeArea] = useState('');
    const [difficultyArea, setDifficultyArea] = useState('');

    useEffect(() => {

        const fetchRecipe = async () => {
            try {
                const configuration = {
                    method: "get",
                    url: "http://localhost:8080/api/recipe",
                };

                const result = await axios(configuration);
                setRecipes(result.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipe();

        if(userId) {
            const fetchSavedRecipe = async () => {
                try {
                    const configuration = {
                        method: "get",
                        url: `http://localhost:8080/api/savedRecipes/ids/${userId}`,
                    };

                    const result = await axios(configuration);
                    setSavedRecipes(result.data.savedRecipes);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchSavedRecipe();
        }

    }, [userId]);


    const saveRecipe = async (recipeId) => {

            try {

                const data = {
                    recipeId,
                    userId
                }

                const configuration = {
                    method: "put",
                    url: "http://localhost:8080/api/recipe",
                    data
                }

                axios(configuration)
                    .then((result) => {
                        setSavedRecipes(result.data.savedRecipes)
                    })
                    .catch((err) => {
                        if (err.response) {
                            setMessage(err.response.data.message);
                        } else if (err.request) {
                            setMessage("No response from server");
                        } else {
                            console.log('Error', err.message);
                            setMessage(err.message);
                        }
                    })
            } catch (err) {
                console.log("Failed to process the request")
        }
    }

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
                    setSavedRecipes(result.data.savedRecipes)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {

        }
    }

    const isRecipeSaved = (id) => savedRecipes?.includes(id)



    const handleSearch = async (e) => {
        e.preventDefault();

        const configuration = {
            method: "get",
            url: `http://localhost:8080/api/recipes/search?name=${searchArea}&CookingTime=${CookingTimeArea}&difficulty=${difficultyArea}`,
        }

        axios(configuration)
            .then((result) => {
                 setRecipes(result.data)
             })
            .catch((err) => {
                 console.log(err)
             })
    }

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
                url: `http://localhost:8080/api/deleteMyRecipeAdmin`,
                data
            }

            axios(configuration)
                .then((result) => {
                    setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId));
                    setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {

        }
    }
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
                                value={CookingTimeArea}
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
                                <PrimaryButton style={{marginTop: "40px"}} type="submit">search</PrimaryButton>
                            </DivCenter>
                        </HomeForm>
                    </ContentCenter>
                </Overlay>
            </IntroWrapper>

            {recipes && (
                <div>
                    <DivCenter>
                        <Header1 style={{margin: "60px 0 20px 0 "}}>Recipes for today</Header1>
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
                                    deleteRecipe={() => confirmDeleteRecipe(recipe._id)}
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
            <Footer/>
        </div>
    )
}

export default Home;