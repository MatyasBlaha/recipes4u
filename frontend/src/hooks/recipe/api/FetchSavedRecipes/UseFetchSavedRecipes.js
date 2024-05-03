import axios from "../../../../services/axiosConfig";
export const UseFetchSavedRecipes = async (userId) => {
    try {
        const result = await axios.get(`/api/savedRecipes/ids/${userId}`);
        const data = result.data.savedRecipes;
        return data
    } catch (err) {
        throw new Error;
    }
};