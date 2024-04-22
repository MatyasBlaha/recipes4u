const {deleteFile} = require('../../../utils/deleteFile')

const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");


exports.deleteRecipe = async (req, res) => {
    try {
        const { recipeId, userId } = req.body;

        // Find the recipe by its ID
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "recipe not found" });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Check if the user is an admin
        if (user.role === 1) {
            // Delete files associated with the recipe
            if (recipe.files && recipe.files.length) {
                recipe.files.forEach(file => {
                    deleteFile(file);
                });
            }

            await RecipeModel.deleteOne(recipe);
            return res.json({ message: "recipe was successfully deleted by admin." });
        }

        // Check if the user is the owner of the recipe
        if (recipe.userOwner.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You do not have permission to delete this recipe." });
        }

        // Delete files associated with the recipe
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
