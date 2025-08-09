/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

import Modal from 'react-modal';

import { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import GlobalStyle from '../styles/GlobalStyle';
import DefaultTheme from '../styles/defaultTheme';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Reset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
