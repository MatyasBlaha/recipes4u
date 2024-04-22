const RecipeModel = require("../../../model/RecipeModel");

exports.editRecipe = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.user.userId;

        const recipe = await RecipeModel.findById(recipeId);


        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.userOwner.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body, { new: true });

        if (!updatedRecipe) {
            return res.status(500).json({ message: 'Failed to update recipe' });
        }


        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}
