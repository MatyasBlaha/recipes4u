import axios from "axios";

export const UseSaveRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.put("/api/recipe", data);
        console.log(result.data.savedRecipes)
        return result.data.savedRecipes;
    } catch (err){
        throw new Error;
    }
};