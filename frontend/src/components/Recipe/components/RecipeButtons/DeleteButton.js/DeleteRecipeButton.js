import React from 'react';
import deleteRecipe from './api/deleteRecipe'; // Updated import path

const DeleteButton = ({ onClick, recipeId, userId, label }) => {

    const handleDelete = async () => {
        try {
            await deleteRecipe(recipeId, userId);
            // Handle any additional logic or side effects after deleting the recipe
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button onClick={() => {
            handleDelete();
            onClick(); // Call onClick from parent component (if any)
        }}>
            {label}
        </button>
    );
};

export default DeleteButton;
