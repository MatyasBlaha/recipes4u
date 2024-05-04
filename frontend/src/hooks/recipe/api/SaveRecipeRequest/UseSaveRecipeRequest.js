
import axios from "../../../../services/axiosConfig";

export const UseSaveRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.put("/api/recipe", data);

        return result.data.savedRecipes;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred");
        } else {
            throw new Error("Network error, please try again");
        }
    }
};