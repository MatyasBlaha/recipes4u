const User = require("../../../../user/model/UserModel");
const RecipeModel = require("../../../model/RecipeModel");


exports.myRecipes = async (req, res) => {
    try {
        const userId = req.user.userId
        const myRecipes = await RecipeModel.find({ userOwner: userId})

        res.json({myRecipes})
    } catch (err){
        res.json(err);
    }
}