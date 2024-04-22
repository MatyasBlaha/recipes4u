import axios from 'axios';

const deleteRecipe = async (recipeId, userId) => {
    try {

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }

        const token = getCookie('token')

        const data = {
            userId, // make sure userId is defined somewhere
            recipeId
        }

        const configuration = {
            method: "post",
            url: `http://localhost:8080/api/deleteRecipe`,
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const result = await axios(configuration);
        return result.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default deleteRecipe;




