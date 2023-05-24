'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import theme from './theme';

function Providers({ children }: PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <DarkMode>{children}</DarkMode>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default Providers;
