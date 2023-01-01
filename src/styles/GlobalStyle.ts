import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Jost', Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  button, input {
    outline: 0;
    border: 0;
  }
  button {
    cursor: pointer;
  }
`;
