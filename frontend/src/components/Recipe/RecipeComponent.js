import React from 'react';

import RecipeDetailContent from "./components/RecipeDetailContent/RecipeDetailContent";
import RecipePreviewContent from "./components/RecipePreviewContent/RecipePreviewContent";


const RecipeComponent = ({ recipe, displayMode, showDetailsLink, recipeButtons, saveRecipe, removeSavedRecipe, editRecipe, deleteRecipe, isRecipeSaved, userRole, }) => {
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

