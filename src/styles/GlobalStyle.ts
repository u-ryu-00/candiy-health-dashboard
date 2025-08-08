import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.color.text}
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    cursor: pointer;
  }

  :lang(ko) {
    h1, h2, h3 {
      word-break: keep-all;
    }
  }
`;

export default GlobalStyle;
