<<<<<<< HEAD
import axios from "../../../../services/axiosConfig";
=======
import axios from "axios";
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf

export const UseRemoveSavedRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.post("/api/removeSavedRecipe", data);
<<<<<<< HEAD
=======
        console.log(result)
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf
        return result.data.savedRecipes;
    } catch (err) {
        throw new Error;
    }
};