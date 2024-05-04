import {React, useRef, useState} from 'react';
import axios from "../../../services/axiosConfig";
import { useNavigate } from 'react-router-dom'

import {userGetUserID} from "../../../hooks/useGetUserInfo/useGetUserID";

import {ContentWrapper, StyledForm, CreateRecipeInput, CreateRecipeSelect, Textarea, Label } from "./styles/CreateRecipe.style";
import {PrimaryButton, DarkButton, DangerButtonSmall} from "../../../assets/styles/global";


const CreateRecipe = () => {
    const navigate = useNavigate();
    const fileInput = useRef();

    const userID = userGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        CookingTime: 0,
        difficulty: "",
        userOwner: userID,

    })


    const handleChange = (e) => {
    e.preventDefault();
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value})
    }

    const handleIngredientChange = (e, index) => {
        const {value} = e.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;

        setRecipe({...recipe, ingredients})
    };


    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    };

    const removeIngredient = (index) => {
        setRecipe(prevRecipe => {
            const ingredients = [...prevRecipe.ingredients];
            ingredients.splice(index, 1);
            return { ...prevRecipe, ingredients };
        });
    };

    const handleCookingTimeChange = (e) => {
        const { value } = e.target;
        if (value === "none") {
            alert("Please select a cooking time.");
        }
        handleChange(e, false); // neposíláme hodnotu do receptu
    };

    const handleDifficultyChange = (e) => {
        const { value } = e.target;
        if (value === "none") {
            alert("Please select a difficulty.");
        }
        handleChange(e, false); // neposíláme hodnotu do receptu
    };

    let files = null
    const handleFileChange = () => {
        files = fileInput.current.files;
        console.log(files);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!recipe.name || !recipe.ingredients.length || !recipe.instructions || !recipe.CookingTime || !recipe.difficulty) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("name", recipe.name);
        formData.append("ingredients", recipe.ingredients);
        formData.append("instructions", recipe.instructions);
        formData.append("CookingTime", recipe.CookingTime);
        formData.append("difficulty", recipe.difficulty);
        formData.append("userOwner", recipe.userOwner);

        const files = fileInput.current.files;
        for (let i = 0; i < files.length; i++) {
            const uniqueFilename = `${userID}-${Date.now()}-${files[i].name}`;
            formData.append("files", files[i], uniqueFilename);
        }

        console.log(recipe.ingredients)
        console.log(formData)



        const configuration = {
            method: "post",
            url: "/api/recipe",
            data: formData
        }

        axios(configuration)
            .then((result) => {
                alert("recipe created successfully");
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // console.log(recipe)
    return (
        <ContentWrapper>

            <StyledForm onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <CreateRecipeInput
                    style={{marginBottom: "20px"}}
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                />


                {recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label htmlFor="ingredients">Ingredients</label>
                        <input
                            key={index}
                            type="text"
                            name="ingredients"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(e, index)}
                            required
                        />
                        <DangerButtonSmall style={{margin: "5px 0 5px 5px"}} type="button" onClick={() => removeIngredient(index)}>delete</DangerButtonSmall>
                    </div>
                ))}
                <DarkButton onClick={addIngredient} type="button">Add ingredient</DarkButton>

                <Label htmlFor="instructions">Instruction</Label>
                <Textarea
                    name="instructions"
                    id="instructions"
                    minLength={100}
                    onChange={handleChange}
                    required
                ></Textarea>


                <Label htmlFor="CookingTime">Cooking time (minues)</Label>
                <CreateRecipeSelect
                    id="CookingTime"
                    name="CookingTime"
                    onChange={handleCookingTimeChange}
                    required
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
                    id="difficulty"
                    name="difficulty"
                    onChange={handleDifficultyChange}
                    required
                >
                    <option hidden value="nonde">Select one... (none)</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </CreateRecipeSelect>

                <Label htmlFor="images">Images</Label>
                <input
                    style={{marginBottom: "20px"}}
                    type="file"
                    id="files"
                    name="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    multiple
                    required
                />

                <PrimaryButton type="submit">add recipe</PrimaryButton>
            </StyledForm>

        </ContentWrapper>
    )
}

export default CreateRecipe;