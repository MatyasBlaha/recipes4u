import React from 'react';
import { Img, IconButton } from '../../style/RecipeComponent.style';
import iconHeart from '../../../../assets/icons/icon_heart.png';
import iconHeartDisabled from '../../../../assets/icons/icon_heart_disabled.png';

import axios from 'axios';
import {userGetUserID} from "../../../../hooks/useGetUserID";
import DeleteButton from './DeleteButton.js/DeleteRecipeButton';

const RecipeButtons = ({ userRole, recipeButtons, isRecipeSaved, recipeId, saveRecipe, removeSavedRecipe, deleteRecipe, }) => {

    const userId = userGetUserID();

    const deleteButtonLabel = recipeButtons === 'main' ? 'Delete Recipe' : 'Delete';

    const renderSaveButton = () => (
        <IconButton
            onClick={() => {
                isRecipeSaved ? removeSavedRecipe(recipeId) : saveRecipe(recipeId);
            }}
        >
            <Img src={isRecipeSaved ? iconHeart : iconHeartDisabled} alt="Save recipe" />
        </IconButton>
    );



    const renderDeleteButton = () => (
        <DeleteButton
            onClick={() => {}}
            recipeId={recipeId}
            userId={userId}
            label={deleteButtonLabel}
        />
    );


    const renderRemoveSavedButton = () => (
        <div>
            <button onClick={() => removeSavedRecipe(recipeId)}>
                Remove Saved Recipe
            </button>
        </div>
    );




    switch (recipeButtons) {
        case 'main':
            return (
                <div>
                    {renderSaveButton()}
                    {userRole === 1 &&
                        {renderDeleteButton}
                    }
                </div>
            );
        case 'savedRecipes':
            return renderRemoveSavedButton();
        case 'myRecipes':
            return (
                {renderDeleteButton}
            );
        default:
            return null;
    }
};

export default RecipeButtons;
