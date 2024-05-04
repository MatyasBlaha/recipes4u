import React from 'react';
import {
    DivFlexRecipeDetailImgs,
    RecipeImageBig,
    RecipeImageSmall,
    RecipeImageSmallContainer
} from "../../style/RecipeComponent.style";

const RecipeImages = ({ recipe, displayMode }) => {

    const importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../../../data/images/', false, /\.(png|jpe?g|svg)$/));

    if (displayMode === 'single' && recipe.files.length) {
        return <RecipeImageBig style={{ width: "180px", height: "180px" }} src={images[recipe.files[0]]} alt={recipe.name} />;
    }
    else if (displayMode === 'all') {
        return (
            <DivFlexRecipeDetailImgs>
                <RecipeImageBig src={images[recipe.files[0]]} alt={`${recipe.name} 1`} />
                <RecipeImageSmallContainer>
                    {recipe.files.slice(1).map((file, index) => (
                        <RecipeImageSmall key={index + 1} src={images[file]} alt={`${recipe.name} ${index + 2}`} />
                    ))}
                </RecipeImageSmallContainer>
            </DivFlexRecipeDetailImgs>
        );
    }

    return null;
}

export default RecipeImages;
