const RecipeModel = require("../../../model/RecipeModel");

exports.loadRecipes = async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err);
    }
}