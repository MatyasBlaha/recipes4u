import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-style: italic;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.2s ease;
    }
    
    
    h2 {
        font-weight: 400;
    }
    
    h3 {
        font-weight: 300;
    }
    
`;

export const lightTheme = {
    body: '#ECECEC',
    text: '#2F2F2F',
    secondText: '#fff',
    danger: '#bb2124',
    componentBackground: 'rgba(0, 0, 0, 0.8)',
    componentBackgroundSecond: 'rgba(255, 255, 255, 0.98)',
    primaryBlue: '#0B8DEB',
};
