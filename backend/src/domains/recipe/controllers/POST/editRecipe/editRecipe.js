const RecipeModel = require("../../../model/RecipeModel");

exports.editRecipe = async (req, res) => {
    try {

        const recipeId = req.params.recipeId;

        const recipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body, { new: true });
        if(!recipe){
            return res.status(404).json({message: 'Recipe not found'})
        }

        res.json(recipe)
    } catch (err){
        res.json(err);
    }
}