const RecipeModel = require("../../../model/RecipeModel");
exports.addRecipe = async (req, res) => {
    try {

        const { name, instructions, CookingTime, difficulty } = req.body;
        const userOwner = req.user.userId

        const ingredients = req.body.ingredients.split(',');
        const files = req.files.map(file => file.originalname);

        const recipe = new RecipeModel({
            name,
            ingredients,
            instructions,
            CookingTime,
            difficulty,
            files,
            userOwner,
        });


        const savedRecipe = await recipe.save();

        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ error: 'error while saving recipe' });
    }
}