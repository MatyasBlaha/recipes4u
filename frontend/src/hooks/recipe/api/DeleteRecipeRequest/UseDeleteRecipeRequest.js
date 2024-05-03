<<<<<<< HEAD
import axios from "../../../../services/axiosConfig";
=======
import axios from "axios";
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf

export const UseDeleteRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        await axios.post("/api/deleteRecipe", data);
    } catch (err) {
        throw new Error;
    }
};
