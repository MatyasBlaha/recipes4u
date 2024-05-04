import {styled} from "styled-components";
import {Input, Select} from "../../../../assets/styles/global"

export const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
`

export const Label = styled.label`
    margin-top: 20px;
`


export const CreateRecipeInput = styled(Input)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
`

export const CreateRecipeSelect = styled(Select)`
    background: ${({ theme }) => theme.componentBackgroundSecond};
    color: ${({ theme }) => theme.text};
`

export const Textarea = styled.textarea`
    height: 300px;
    resize: none;
`

export const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 60%;

    @media screen and (max-width: 1200px) {
        width: 90%;
        margin: 0 auto;
    }
`