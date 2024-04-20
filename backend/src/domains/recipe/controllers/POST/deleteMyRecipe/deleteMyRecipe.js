const {deleteFile} = require('../../../utils/deleteFile')

const RecipeModel = require("../../../model/RecipeModel");
const User = require("../../../../user/model/UserModel");


exports.deleteMyRecipe = async (req, res) => {
    try {

        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await User.findById(req.body.userId);
        if (!recipe) {
            return res.status(404).json({ message: "recipe not found" });
        }

        if (recipe.userOwner.toString() !== user._id.toString()) {
            return res.status(403).json({ recipeOwner: recipe.userOwner, currentUser: user._id });
        }

        if (recipe.files && recipe.files.length) {
            recipe.files.forEach(file => {
                deleteFile(file);
            });
        }


        await RecipeModel.deleteOne(recipe);


        res.json({ message: "recipe was successfully deleted." });
    } catch (err){
        res.json(err);
    }
}