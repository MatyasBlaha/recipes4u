import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background 0.2s ease, color 0.2s ease;
    }
`;

export const lightTheme = {
    body: '#ECECEC',
    text: '#2F2F2F'
};

export const darkTheme = {
    body: '#1E1E1E',
    text: '#FFF'
};