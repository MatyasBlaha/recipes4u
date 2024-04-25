const {deleteFile} = require('../../../utils/deleteFile')

const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");


exports.deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user.userId


        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "recipe not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        if (user.role === 1) {
            if (recipe.files && recipe.files.length) {
                recipe.files.forEach(file => {
                    deleteFile(file);
                });
            }

            await RecipeModel.deleteOne(recipe);
            return res.json({ message: "recipe was successfully deleted by admin." });
        }


        if (recipe.userOwner.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You do not have permission to delete this recipe." });
        }

        if (recipe.files && recipe.files.length) {
            recipe.files.forEach(file => {
                deleteFile(file);
            });
        }

        await RecipeModel.deleteOne(recipe);
        res.json({ message: "recipe was successfully deleted." });

    } catch (err) {
        res.json(err);
    }
}
