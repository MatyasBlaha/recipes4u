const express = require('express')
const router = express.Router();
const { loadRecipes, editRecipe, recipeDetails, addRecipe, saveRecipe, savedRecipesIds, savedRecipes, removeSavedRecipe, myRecipes, deleteMyRecipe, deleteMyRecipeAdmin, searchRecipes} = require('../controllers/recipeController')
const { auth, isAdmin } = require('../../../endpoints/middleware/auth');


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../../../../frontend/src/data/images'));
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.originalname);
    }
});
const uploads = multer({ storage: storage });



router.post('/recipe',auth, uploads.array("files", 4), addRecipe);
router.post('/removeSavedRecipe',auth, removeSavedRecipe);
router.post('/deleteMyRecipe', auth, deleteMyRecipe);
router.post('/deleteMyRecipeAdmin', auth, isAdmin, deleteMyRecipeAdmin);
router.post('/editRecipe/:recipeId',auth, editRecipe);

router.put('/recipe', auth, saveRecipe);

router.get('/recipe', loadRecipes);
router.get('/recipe/:recipeId', recipeDetails)
router.get('/savedRecipes/ids/:userId',auth, savedRecipesIds);
router.get('/savedRecipes/:userId',auth, savedRecipes);
router.get('/myRecipes/:userId',auth, myRecipes)

router.get('/recipes/search', searchRecipes);

module.exports = router;