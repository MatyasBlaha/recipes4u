<<<<<<< HEAD
import axios from "../../../../services/axiosConfig";
=======
import axios from "axios";
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf

export const UseSaveRecipeRequest = async (recipeId) => {
    try {
        const data = { recipeId };
        const result = await axios.put("/api/recipe", data);
<<<<<<< HEAD
        return result.data.savedRecipes;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || "An error occurred");
        } else {
            throw new Error("Network error, please try again");
        }
=======
        console.log(result.data.savedRecipes)
        return result.data.savedRecipes;
    } catch (err){
        throw new Error;
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf
    }
};