const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");

exports.removeSavedRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const userId = req.user.userId
        const user = await User.findById(userId);

        user.savedRecipes.pull(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes})
    } catch (err){
        res.json(err);
    }
}