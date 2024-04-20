const {deleteFile} = require('../../../utils/deleteFile')

const RecipeModel = require("../../../model/RecipeModel");


exports.deleteMyRecipeAdmin = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById({_id: req.body.recipeId})
        if (!recipe) {
            return res.status(404).json({ message: "recipe wasn't found" });
        }

        if (recipe.files && recipe.files.length) {
            recipe.files.forEach(file => {
                deleteFile(file);
            });
        }

        await RecipeModel.deleteOne(recipe)
        res.json({ message: "recipe was successfully deleted" });
    } catch (err) {
        res.json(err);
    }
}