const User = require("../../../../user/model/UserModel");

exports.savedRecipesIds = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json({savedRecipes: user?.savedRecipes})
    } catch (err) {
        res.json(err);
    }
}