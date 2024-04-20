const RecipeModel = require("../../../model/RecipeModel");

exports.searchRecipes = async (req, res) => {

    const {name, CookingTime, difficulty} = req.query
    let query = {}

    if(name){
        query.name = {$regex: name, $options: 'i'}
    }

    if(CookingTime){
        query.CookingTime = CookingTime
    }

    if(difficulty){
        query.difficulty = difficulty
    }
    try {
        const recipes = Object.keys(query).length === 0 ? await RecipeModel.find({}) : await RecipeModel.find(query);
        res.json(recipes)
    } catch (err){
        res.json(err);
    }
}