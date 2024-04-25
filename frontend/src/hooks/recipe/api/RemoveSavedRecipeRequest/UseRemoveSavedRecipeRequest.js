import axios from "axios";

export const UseRemoveSavedRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.post("/api/removeSavedRecipe", data);
        console.log(result)
        return result.data.savedRecipes;
    } catch (err) {
        throw new Error;
    }
};