import axios from "../../../../services/axiosConfig";

export const UseFetchRecipesRequest = async () => {
    try {
        const result = await axios.get("/api/recipe");
        return result.data;
    } catch (err) {
        throw new Error;
    }
};