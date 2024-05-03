import axios from "axios";

export const UseFetchRecipes = async () => {
    try {
        const result = await axios.get("/api/recipe");
        return result.data;
    } catch (err) {
        throw new Error;
    }
};