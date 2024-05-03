import axios from "../../../../services/axiosConfig";

export const UseRemoveSavedRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.post("/api/removeSavedRecipe", data);
        return result.data.savedRecipes;
    } catch (err) {
        throw new Error;
    }
};