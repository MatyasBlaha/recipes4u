<<<<<<< HEAD
import axios from "../../../../services/axiosConfig";
=======
import axios from "axios";

>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf
export const UseFetchSavedRecipes = async (userId) => {
    try {
        const result = await axios.get(`/api/savedRecipes/ids/${userId}`);
        const data = result.data.savedRecipes;
        return data
    } catch (err) {
        throw new Error;
    }
};