'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// eslint-disable-next-line import/prefer-default-export
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
