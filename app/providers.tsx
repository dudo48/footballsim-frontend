'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript, DarkMode } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import theme from './theme';

export function Providers({ children }: PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <DarkMode>{children}</DarkMode>
      </ChakraProvider>
    </CacheProvider>
  );
}
