/* eslint-disable import/prefer-default-export */

// eslint-disable-next-line import/no-extraneous-dependencies
import { render as originalRender } from '@testing-library/react';

import React from 'react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';

export function render(element: React.ReactElement) {
  return originalRender((
    <ThemeProvider theme={defaultTheme}>
      {element}
    </ThemeProvider>
  ));
}
