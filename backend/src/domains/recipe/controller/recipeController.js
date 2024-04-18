const express = require("express");
const mongoose = require('mongoose');
const RecipeModel = require('../model/RecipeModel')
const User = require('../../user/model/UserModel')
const fs = require('fs');
const path = require("path");


const deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, '../../../../../frontend/src/data/images', filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Error deleting file ${fullPath}:`, err);
        } else {
            console.log(`File ${fullPath} was deleted successfully.`);
        }
    });
};


exports.loadRecipes = async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err);
    }
}

exports.addRecipe = async (req, res) => {
    try {

        const { name, instructions, CookingTime, difficulty, userOwner } = req.body;

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
        res.status(500).json({ error: 'Chyba při ukládání receptu' });
    }
}

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

exports.recipeDetails = async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await RecipeModel.findById(recipeId)
    if(!recipe){
        return res.status(404).json({message: 'Recipe not found'})
    }

    const userId = recipe.userOwner;

    let userName;
    let user = null
    if (userId) {
        user = await User.findOne({ _id: userId, name: { $exists: true } });
        if (user) {
            userName = user.name;
        } else {
            res.json({message: 'User not found'})
        }
    } else {
        res.json({message: 'User not found'})
    }

    const recipeDetail = {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        CookingTime: recipe.CookingTime,
        difficulty: recipe.difficulty,
        imageUrl: recipe.imageUrls,
        userOwner: recipe.userOwner,
        files: recipe.files,
        userName: user.name,
    };

    res.json(recipeDetail)

}

exports.saveRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);

        try{
            const user = await User.findById(req.body.userId);

            user.savedRecipes.push(recipe);
            await user.save();
            res.json({ savedRecipes: user.savedRecipes})
        } catch (err) {
            res.json({ message: "please, login" });
        }

    } catch (err) {
        res.json(err);
    }
}

exports.savedRecipesIds = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json({savedRecipes: user?.savedRecipes})
    } catch (err) {
        res.json(err);
    }
}

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

exports.removeSavedRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await User.findById(req.body.userId);

        user.savedRecipes.pull(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes})
    } catch (err){
        res.json(err);
    }
}

exports.myRecipes = async (req, res) => {
    try {
        const userId = await User.findById(req.params.userId);
        const myRecipes = await RecipeModel.find({ userOwner: userId})

        res.json({myRecipes})
    } catch (err){
        res.json(err);
    }
}

exports.deleteMyRecipe = async (req, res) => {
    try {

        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await User.findById(req.body.userId);
        if (!recipe) {
            return res.status(404).json({ message: "Recept nebyl nalezen." });
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


        res.json({ message: "Recept byl úspěšně smazán." });
    } catch (err){
        res.json(err);
    }
}

exports.deleteMyRecipeAdmin = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById({_id: req.body.recipeId})
        if (!recipe) {
            return res.status(404).json({ message: "Recept nebyl nalezen." });
        }

        if (recipe.files && recipe.files.length) {
            recipe.files.forEach(file => {
                deleteFile(file);
            });
        }

        await RecipeModel.deleteOne(recipe)
        res.json({ message: "Recept byl úspěšně smazán." });
    } catch (err) {
        res.json(err);
    }
}

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