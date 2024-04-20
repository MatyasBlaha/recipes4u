const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");


exports.recipeDetails = async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await RecipeModel.findById(recipeId)
    if(!recipe){
        return res.status(404).json({message: 'Recipe not found'})
    }

    const userId = recipe.userOwner;

    let userName;
    let user = null
    if (userId) {
        user = await User.findOne({ _id: userId, name: { $exists: true } });
        if (user) {
            userName = user.name;
        } else {
            res.json({message: 'User not found'})
        }
    } else {
        res.json({message: 'User not found'})
    }

    const recipeDetail = {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        CookingTime: recipe.CookingTime,
        difficulty: recipe.difficulty,
        imageUrl: recipe.imageUrls,
        userOwner: recipe.userOwner,
        files: recipe.files,
        userName: user.name,
    };

    res.json(recipeDetail)

}