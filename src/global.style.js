import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body {
    transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  button {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }
`;