import {styled} from "styled-components";


//********** RECIPE MAIN PAGE *************//

export const RecipeContainer = styled.div`
    padding: 30px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    border-radius: 40px;
    margin: 50px 20px;
    overflow: hidden;
    
    @media screen and (max-width: 540px) {
        min-width: 300px;
    }
`

export const RecipeWrapper = styled.div`
    width: 1220px;
    margin: 0 auto;
    
    @media (max-width: 1500px) {
        width: calc(100% - 40px);
    }
`

export const RecipeContentContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) { // pro menší rozlišení
        & > div > div > div > p { // specifický selektor pro text instrukcí
            max-width: 100%; // nastavení maximální šířky
            overflow: hidden; // skrytí přebytečného textu
            text-overflow: ellipsis; // zobrazení "..."
            white-space: nowrap; // zabránění zalomení textu
        }
    }
    
    @media screen and (max-width: 540px) {
        flex-direction: column;
    }
`

export const IconButton = styled.button`
    width: 44px;
    height: 50px;
    border: none;
    cursor: pointer;
    margin-bottom: 5px;
    background: transparent;
`

export const Img = styled.img`
    width: 100%;
    border: none;
    padding: 10px;
`








//********** RECIPE DETAIL *************//


export const RecipeDetailWrapper = styled.div`
    padding: 50px;
    height: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    border-radius: 40px;

`

export const DivFlexRecipeImgAndIngredients = styled.div`
    display: flex;
    
    @media (max-width: 800px) {
        flex-direction: column;
    }
    
    h3 {
        font-weight: 400;
        font-size: 1.4rem;
        padding-bottom: 10px;
    }
    
`

export const DivFlexRecipeDetailImgs = styled.div`
    display: flex;
    
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

export const RecipeImageBig = styled.img`
    height: 380px;
    width: 380px;
    object-fit: cover;
    border-radius: 20px;

    @media (max-width: 500px) {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    
`;

export const RecipeImageSmall = styled.img`
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 20px;
    
    @media (max-width: 500px) { 
        height: 70px;
        width: 70px;
        object-fit: cover;
    }
    
`;



export const RecipeImageSmallContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    gap: 10px;

    @media (max-width: 600px) { // pro menší rozlišení
        display: flex;
        flex-direction: row;
        margin: 10px 0 ;
    }
`



export const IngredientsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 30px;
    
    li {
        width: 100%;
        text-align: left;
        padding: 5px;
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column; /* nastavíme flexbox layout jako sloupec */
    justify-content: center; /* zarovnává všechny položky na vertikálním středu */
    align-items: center;
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column; /* nastavíme flexbox layout jako sloupec */
    justify-content: center; /* zarovnává všechny položky na vertikálním středu */
    align-items: center;
`;

export const IngredientItem = styled.li`
    white-space: nowrap;
`;


export const InstructionContainer = styled.div`
    margin-top: 50px;
    
    h3 {
        font-weight: 400;
        font-size: 1.4rem;
        padding-bottom: 10px;
    }
`