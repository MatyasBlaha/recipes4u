const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");


exports.saveRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const userId = req.user.userId

        try{
            const user = await User.findById(userId);

            user.savedRecipes.push(recipe);
            await user.save();
            res.json({ savedRecipes: user.savedRecipes})
        } catch (err) {
            res.json({ message: "please, login" });
        }

    } catch (err) {
        res.json(err);
    }
}