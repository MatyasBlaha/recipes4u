const User = require("../../../../user/model/UserModel");
const RecipeModel = require("../../../model/RecipeModel");


exports.savedRecipes = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: {
                $in: user?.savedRecipes
            }
        });
        res.json({savedRecipes})
    } catch (err) {
        res.json(err);
    }
}