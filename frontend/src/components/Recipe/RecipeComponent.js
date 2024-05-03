import React from 'react';

import RecipeDetailContent from "./components/RecipeDetailContent/RecipeDetailContent";
import RecipePreviewContent from "./components/RecipePreviewContent/RecipePreviewContent";


<<<<<<< HEAD
const RecipeComponent = ({ recipe, displayMode, showDetailsLink, recipeButtons, saveRecipe, removeSavedRecipe, editRecipe, deleteRecipe, isRecipeSaved, userRole, message}) => {
=======
const RecipeComponent = ({ recipe, displayMode, showDetailsLink, recipeButtons, saveRecipe, removeSavedRecipe, editRecipe, deleteRecipe, isRecipeSaved, userRole, }) => {
>>>>>>> 6e233c9a8297d1e75273318ca2e54361804bcbbf
    return (
        <div>
            {showDetailsLink ? (
                <RecipePreviewContent
                    recipe={recipe}
                    displayMode={displayMode}
                    editRecipe={editRecipe}
                    recipeButtons={recipeButtons}
                    deleteRecipe={deleteRecipe}
                    userRole={userRole}
                    saveRecipe={saveRecipe}
                    removeSavedRecipe={removeSavedRecipe}
                    isRecipeSaved={isRecipeSaved}
                    showDetailsLink={showDetailsLink}
                    message={message}
                />
            ) : (
                <RecipeDetailContent
                    recipe={recipe}
                    recipeButtons={recipeButtons}
                    deleteRecipe={deleteRecipe}
                    userRole={userRole}
                    removeSavedRecipe={removeSavedRecipe}
                    isRecipeSaved={isRecipeSaved}
                    displayMode={displayMode}
                />

            )}
        </div>
    );
};

export default RecipeComponent;

