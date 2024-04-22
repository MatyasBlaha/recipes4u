const express = require('express')
const router = express.Router();
const { auth, isAdmin } = require('../../../endpoints/middleware/auth');

// GET
const {loadRecipes} = require('../controllers/GET/loadRecipes/loadRecipes')
const {myRecipes} = require('../controllers/GET/myRecipes/myRecipes')
const {recipeDetails} = require('../controllers/GET/recipeDetails/recipeDetails')
const {savedRecipes} = require('../controllers/GET/savedRecipes/savedRecipes')
const {savedRecipesIds} = require('../controllers/GET/savedRecipesIds/savedRecipesIds')
const {searchRecipes} = require('../controllers/GET/searchRecipes/searchRecipes')

// POST
const {addRecipe} = require('../controllers/POST/addRecipe/addRecipe')
const {deleteRecipe} = require('../controllers/POST/deleteMyRecipe/deleteRecipe')
const {editRecipe} = require('../controllers/POST/editRecipe/editRecipe')
const {removeSavedRecipe} = require('../controllers/POST/removeSavedRecipe/removeSavedRecipe')
const {saveRecipe} = require('../controllers/POST/saveRecipe/saveRecipe')

//UTILS
const {uploads} = require('../utils/storage')



router.post('/recipe',auth, uploads.array("files", 4), addRecipe);
router.post('/removeSavedRecipe',auth, removeSavedRecipe);
router.post('/deleteRecipe', auth, deleteRecipe);
router.post('/editRecipe/:recipeId',auth, editRecipe);

router.put('/recipe', auth, saveRecipe);

router.get('/recipe', loadRecipes);
router.get('/recipe/:recipeId', recipeDetails)
router.get('/savedRecipes/ids/:userId',auth, savedRecipesIds);
router.get('/savedRecipes/:userId',auth, savedRecipes);
router.get('/myRecipes/:userId',auth, myRecipes)

router.get('/recipes/search', searchRecipes);

module.exports = router;