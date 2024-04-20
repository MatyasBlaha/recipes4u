import react, {React} from 'react';
import {DivCenter, DivFlexColumn} from "../../../../assets/styles/global";
import {IngredientItem, IngredientsContainer, LeftColumn, RightColumn} from "../../style/RecipeComponent.style";



const RecipeIngredients = ({displayMode, recipeIngredients}) => {
    if (displayMode === 'all') {
        const ingredients = recipeIngredients;
        const halfLength = Math.ceil(ingredients.length / 2);
        const leftIngredients = ingredients.slice(0, halfLength);
        const rightIngredients = ingredients.slice(halfLength);

        return (
            <DivFlexColumn style={{width: "100%"}}>
                <DivCenter style={{marginBottom: "20px", marginTop: "20px"}}>
                    <h3>Ingredients</h3>
                </DivCenter>
                <IngredientsContainer>

                    <LeftColumn>
                        {leftIngredients.map((ingredient, index) => (
                            <IngredientItem key={index}>{ingredient}</IngredientItem>
                        ))}
                    </LeftColumn>
                    <RightColumn>
                        {rightIngredients.map((ingredient, index) => (
                            <IngredientItem key={index}>{ingredient}</IngredientItem>
                        ))}
                    </RightColumn>
                </IngredientsContainer>
            </DivFlexColumn>
        );
    }
};

export default RecipeIngredients