import axios from "../../../../services/axiosConfig";

export const UseDeleteRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        await axios.post("/api/deleteRecipe", data);
    } catch (err) {
        throw new Error;
    }
};
